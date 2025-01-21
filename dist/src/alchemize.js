const instances = Symbol("instances");
// Combine multiple classes into a single class
function alchemize(...BaseClasses) {
    // Correctly initialize instances of built-in classes
    // Define the combined class
    class Combined {
        constructor(...args) {
            // Initialize each base class and assign properties
            this[instances] = BaseClasses.map((BaseClass) => new BaseClass(...args));
            return new Proxy(this, {
                get(target, prop, receiver) {
                    for (const instance of target[instances]) {
                        if (prop in instance) {
                            const value = instance[prop];
                            return typeof value === 'function' ? value.bind(instance) : value;
                        }
                    }
                    return Reflect.get(target, prop, receiver);
                },
                set(target, prop, value, receiver) {
                    for (const instance of target[instances]) {
                        if (prop in instance) {
                            instance[prop] = value;
                            return true;
                        }
                    }
                    return Reflect.set(target, prop, value, receiver);
                },
            });
        }
        // Support instanceof for all base classes
        static [Symbol.hasInstance](instance) {
            return BaseClasses.some((BaseClass) => instance instanceof BaseClass);
        }
    }
    // Build the prototype chain
    let currentPrototype = Combined.prototype;
    [...BaseClasses].reverse().forEach((BaseClass) => {
        const basePrototype = BaseClass.prototype;
        if (!Object.prototype.isPrototypeOf.call(basePrototype, currentPrototype)) {
            Object.setPrototypeOf(currentPrototype, basePrototype);
            currentPrototype = basePrototype;
        }
    });
    // Copy static properties and methods
    BaseClasses.forEach((BaseClass) => {
        Reflect.ownKeys(BaseClass).forEach((key) => {
            if (!["prototype", "length", "name"].includes(key)) {
                Object.defineProperty(Combined, key, Object.getOwnPropertyDescriptor(BaseClass, key));
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
export { alchemize };
//# sourceMappingURL=alchemize.js.map