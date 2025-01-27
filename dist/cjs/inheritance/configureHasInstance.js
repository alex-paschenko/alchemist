"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureHasInstance = configureHasInstance;
const constants_1 = require("../constants");
const hasInstance_1 = require("./hasInstance");
function configureHasInstance(targetClass) {
    try {
        if (targetClass.hasOwnProperty(constants_1.processedClass)) {
            return;
        }
        // Check if Symbol.hasInstance already exists on the target class
        const descriptor = Object.getOwnPropertyDescriptor(targetClass, Symbol.hasInstance);
        if (descriptor) {
            // If Symbol.hasInstance exists, check if it is configurable
            if (descriptor.configurable) {
                const originalHasInstance = descriptor.value;
                // Wrap the existing Symbol.hasInstance with the new logic
                Object.defineProperty(targetClass, Symbol.hasInstance, {
                    value: function (instance) {
                        // Call the existing Symbol.hasInstance if it exists
                        if (typeof originalHasInstance === 'function') {
                            return originalHasInstance.call(this, instance) || (0, hasInstance_1.hasInstance)(instance, this);
                        }
                        // If no original method, call the new function directly
                        return (0, hasInstance_1.hasInstance)(instance, this);
                    },
                    configurable: true,
                    writable: true,
                });
            }
        }
        else {
            // If Symbol.hasInstance does not exist, define it only if the class is configurable
            Object.defineProperty(targetClass, Symbol.hasInstance, {
                value: function (instance) {
                    return (0, hasInstance_1.hasInstance)(instance, this);
                },
                configurable: true,
                writable: true,
            });
        }
        Object.defineProperty(targetClass, constants_1.processedClass, {
            value: true,
            configurable: true,
            writable: false,
        });
    }
    catch (error) {
        return;
    }
}
//# sourceMappingURL=configureHasInstance.js.map