type Constructor<T = {}> = new (...args: any[]) => T;

// Type for merging instance properties and methods
type MergeInstance<TBaseClasses extends Constructor[]> = TBaseClasses extends [
  infer First extends Constructor,
  ...infer Rest extends Constructor[]
]
  ? InstanceType<First> & MergeInstance<Rest>
  : unknown;

// Type for merging static properties and methods
type MergeStatics<TBaseClasses extends Constructor[]> = TBaseClasses extends [
  infer First extends Constructor,
  ...infer Rest extends Constructor[]
]
  ? First & MergeStatics<Rest>
  : unknown;

// Combined type that includes both instance and static properties
type MergeClasses<TBaseClasses extends Constructor[]> = Constructor<
  MergeInstance<TBaseClasses>
> &
  MergeStatics<TBaseClasses>;

function alchemize<TBaseClasses extends Constructor[]>(
  ...BaseClasses: TBaseClasses
): MergeClasses<TBaseClasses> {
  // Create the combined class
  class Combined {
    constructor(...args: any[]) {
      // Initialize all base classes and assign their properties to `this`
      BaseClasses.forEach((BaseClass) => {
        Object.assign(this, new BaseClass(...args));
      });
    }

    // Support instanceof for all base classes
    static [Symbol.hasInstance](instance: any) {
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
      if (!["prototype", "name", "length"].includes(key as string)) {
        Object.defineProperty(
          Combined,
          key,
          Object.getOwnPropertyDescriptor(BaseClass, key)!
        );
      }
    });
  });

  // Copy prototype methods and properties
  BaseClasses.forEach((BaseClass) => {
    Reflect.ownKeys(BaseClass.prototype).forEach((key) => {
      if (key !== "constructor") {
        Object.defineProperty(
          Combined.prototype,
          key,
          Object.getOwnPropertyDescriptor(BaseClass.prototype, key)!
        );
      }
    });
  });

  return Combined as MergeClasses<TBaseClasses>;
}

export { alchemize };
