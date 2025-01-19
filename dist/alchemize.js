"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alchemize = alchemize;
function alchemize(...BaseClasses) {
    const CombinedClass = BaseClasses.reduce((Base, Current) => {
        return class extends Base {
            constructor(...args) {
                super(...args);
                Reflect.construct(Current, args, new.target);
            }
        };
    }, class {
    });
    class Combined extends CombinedClass {
        constructor(...args) {
            super(...args);
            BaseClasses.forEach((BaseClass) => {
                let current = BaseClass;
                while (current && typeof current === "function") {
                    if (current.prototype) {
                        Object.assign(this, new current(...args));
                    }
                    current = Object.getPrototypeOf(current);
                }
            });
        }
        static [Symbol.hasInstance](instance) {
            return BaseClasses.some((BaseClass) => instance instanceof BaseClass);
        }
    }
    function copyProperties(target, source) {
        if (['function', 'object'].includes(typeof source)) {
            Reflect.ownKeys(source).forEach((key) => {
                if (!["prototype", "name", "length"].includes(key)) {
                    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                }
            });
        }
    }
    BaseClasses.forEach((BaseClass) => {
        let current = BaseClass;
        while (current) {
            copyProperties(Combined, current);
            copyProperties(Combined.prototype, current.prototype);
            current = Object.getPrototypeOf(current);
        }
    });
    return Combined;
}
//# sourceMappingURL=alchemize.js.map