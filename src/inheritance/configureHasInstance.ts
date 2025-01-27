import { processedClass } from '../constants';
import { hasInstance } from './hasInstance';

export function  configureHasInstance<T extends Function>(
  targetClass: T,
): void {
  try {
    if (targetClass.hasOwnProperty(processedClass)) {
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
          value: function (instance: any) {
            // Call the existing Symbol.hasInstance if it exists
            if (typeof originalHasInstance === 'function') {
              return originalHasInstance.call(this, instance) || hasInstance(instance, this);
            }
            // If no original method, call the new function directly
            return hasInstance(instance, this);
          },
          configurable: true,
          writable: true,
        });
      }
    } else {
    // If Symbol.hasInstance does not exist, define it only if the class is configurable

      Object.defineProperty(targetClass, Symbol.hasInstance, {
        value: function (instance: any) {
          return hasInstance(instance, this);
        },
        configurable: true,
        writable: true,
      });
    }

    Object.defineProperty(targetClass, processedClass, {
      value: true,
      configurable: true,
      writable: false,
    })
  }
  catch (error: unknown) {
    return;
  }
}
