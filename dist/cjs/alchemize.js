"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alchemize = alchemize;
const constants_1 = require("./constants");
const errors_1 = require("./errors");
const addInstanceOfSupport_1 = require("./inheritance/addInstanceOfSupport");
const passOutParams_1 = require("./passOutParams");
// Combine multiple classes into a single class
function alchemize(...args) {
    var _a;
    var _b;
    const firstArgIsRecipe = (_a = args[0]) === null || _a === void 0 ? void 0 : _a[constants_1.recipeIdentity];
    const recipe = firstArgIsRecipe
        ? args[0]
        : {};
    const BaseClasses = (firstArgIsRecipe ? (args.slice(1) || []) : args);
    if (BaseClasses.length < 2) {
        throw new errors_1.AlchemistError('E050');
    }
    for (const [index, Class] of BaseClasses.entries()) {
        if (!(typeof Class === 'function' &&
            /^class\s/.test(Function.prototype.toString.call(Class)))) {
            throw new errors_1.AlchemistError('E051', index);
        }
    }
    (0, addInstanceOfSupport_1.addInstanceOfSupport)(BaseClasses, recipe.instanceOfSupport);
    // Define the combined class
    class Combined {
        constructor(...args) {
            this[_b] = BaseClasses;
            const splittedArgs = (0, passOutParams_1.passOutSlices)(args, BaseClasses.length, recipe.passOutParamRules);
            this[constants_1.instances] = [];
            for (const Class of BaseClasses) {
                const instance = new Class(...splittedArgs.shift());
                this[constants_1.instances].push(instance);
            }
            return new Proxy(this, {
                get(target, prop, receiver) {
                    for (const instance of target[constants_1.instances]) {
                        if (prop in instance) {
                            const value = instance[prop];
                            if (typeof value === 'function') {
                                return (...args) => Reflect.apply(value, instance, args);
                            }
                            return value;
                        }
                    }
                    return Reflect.get(target, prop, receiver);
                },
                set(target, prop, value, receiver) {
                    for (const instance of target[constants_1.instances]) {
                        if (prop in instance) {
                            instance[prop] = value;
                            return true;
                        }
                    }
                    return Reflect.set(target, prop, value, receiver);
                },
            });
        }
        [constants_1.checkInheritance](klass) {
            for (const proto of this[constants_1.prototypes]) {
                let currentClass = proto;
                while (typeof currentClass === 'function') {
                    if (currentClass === klass) {
                        return true;
                    }
                    currentClass = Object.getPrototypeOf(currentClass);
                }
            }
            return false;
        }
        ;
    }
    _b = constants_1.prototypes;
    // Copy static properties and methods
    BaseClasses.forEach((BaseClass) => {
        Reflect.ownKeys(BaseClass).forEach((key) => {
            if (!["prototype", "length", "name"].includes(key)) {
                const descriptor = Object.getOwnPropertyDescriptor(BaseClass, key);
                if (descriptor) {
                    const existingDescriptor = Object.getOwnPropertyDescriptor(Combined, key);
                    if (!existingDescriptor || existingDescriptor.configurable) {
                        // Ensure static methods maintain the correct context of `this`.
                        if (typeof descriptor.value === 'function') {
                            const originalMethod = descriptor.value;
                            descriptor.value = function (...args) {
                                // Use `this` to dynamically reference the current class
                                return originalMethod.apply(this, args);
                            };
                        }
                        Object.defineProperty(Combined, key, descriptor);
                    }
                }
            }
        });
        Reflect.ownKeys(BaseClass.prototype).forEach((key) => {
            if (key !== "constructor") {
                const descriptor = Object.getOwnPropertyDescriptor(BaseClass.prototype, key);
                if (descriptor && (descriptor.get || descriptor.set)) {
                    Object.defineProperty(Combined.prototype, key, descriptor);
                }
                else {
                    Object.defineProperty(Combined.prototype, key, Object.getOwnPropertyDescriptor(BaseClass.prototype, key));
                }
            }
        });
    });
    return Combined;
}
//# sourceMappingURL=alchemize.js.map