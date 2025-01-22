type Constructor<T = {}> = new (...args: any[]) => T;

// Merge instance properties and methods
type MergeInstance<TBaseClasses extends Constructor[]> = TBaseClasses extends [
  infer First extends Constructor,
  ...infer Rest extends Constructor[]
]
  ? InstanceType<First> & MergeInstance<Rest>
  : unknown;

// Merge static properties and methods
type MergeStatics<TBaseClasses extends Constructor[]> = TBaseClasses extends [
  infer First extends Constructor,
  ...infer Rest extends Constructor[]
]
  ? First & MergeStatics<Rest>
  : unknown;

// Combined type including instance and static properties
type MergeClasses<TBaseClasses extends Constructor[]> = Constructor<
  MergeInstance<TBaseClasses>
> &
  MergeStatics<TBaseClasses>;

const instances = Symbol("instances");

// Combine multiple classes into a single class
function alchemize<TBaseClasses extends Constructor[]>(
  ...BaseClasses: TBaseClasses
): MergeClasses<TBaseClasses> {
  // Define the combined class
  class Combined {
    constructor(...args: any[]) {
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
    static [Symbol.hasInstance](instance: any): boolean {
      return BaseClasses.some((BaseClass) => instance instanceof BaseClass);
    }

    private [instances]: any;
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
      if (!["prototype", "length", "name"].includes(key as string)) {
        const descriptor = Object.getOwnPropertyDescriptor(BaseClass, key);
        if (descriptor) {
          // Ensure static methods maintain the correct context of `this`.
          if (typeof descriptor.value === 'function') {
            const originalMethod = descriptor.value;
            descriptor.value = function (...args: any[]) {
              // Use `this` to dynamically reference the current class
              return originalMethod.apply(this, args);
            };
          }
          Object.defineProperty(Combined, key, descriptor);
        }
      }
    });

    Reflect.ownKeys(BaseClass.prototype).forEach((key) => {
      if (key !== "constructor") {
        const descriptor = Object.getOwnPropertyDescriptor(BaseClass.prototype, key);
        if (descriptor && (descriptor.get || descriptor.set)) {
          Object.defineProperty(Combined.prototype, key, descriptor);
        } else {
          Object.defineProperty(
            Combined.prototype,
            key,
            Object.getOwnPropertyDescriptor(BaseClass.prototype, key)!
          );
        }
      }
    });
  });

  return Combined as MergeClasses<TBaseClasses>;
}

export { alchemize };
