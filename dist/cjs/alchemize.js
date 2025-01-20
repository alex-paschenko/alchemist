"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alchemize = alchemize;
function alchemize(...BaseClasses) {
    // Create the combined class
    class Combined {
        constructor(...args) {
            // Initialize all base classes and assign their properties to `this`
            BaseClasses.forEach((BaseClass) => {
                Object.assign(this, new BaseClass(...args));
            });
        }
        // Support instanceof for all base classes
        static [Symbol.hasInstance](instance) {
            return BaseClasses.some((BaseClass) => instance instanceof BaseClass);
        }
    }
    // Start building the prototype chain from the most derived class
    let currentPrototype = Combined.prototype;
    [...BaseClasses].reverse().forEach((BaseClass) => {
        // Ensure we don't create cycles
        const baseProto = BaseClass.prototype;
        if (!Object.prototype.isPrototypeOf.call(baseProto, currentPrototype)) {
            Object.setPrototypeOf(currentPrototype, baseProto);
            currentPrototype = baseProto;
        }
    });
    // Copy static properties and methods
    BaseClasses.forEach((BaseClass) => {
        Reflect.ownKeys(BaseClass).forEach((key) => {
            if (!["prototype", "name", "length"].includes(key)) {
                Object.defineProperty(Combined, key, Object.getOwnPropertyDescriptor(BaseClass, key));
            }
        });
    });
    // Copy prototype methods and properties
    BaseClasses.forEach((BaseClass) => {
        Reflect.ownKeys(BaseClass.prototype).forEach((key) => {
            if (key !== "constructor") {
                Object.defineProperty(Combined.prototype, key, Object.getOwnPropertyDescriptor(BaseClass.prototype, key));
            }
        });
    });
    return Combined;
}
//# sourceMappingURL=alchemize.js.map