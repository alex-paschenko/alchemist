type Constructor<T = {}> = new (...args: any[]) => T;

type MergeClasses<TBaseClasses extends Constructor[]> = TBaseClasses extends [
  infer First extends Constructor,
  ...infer Rest extends Constructor[]
]
  ? InstanceType<First> & MergeClasses<Rest>
  : unknown;

function alchemize<TBaseClasses extends Constructor[]>(
  ...BaseClasses: TBaseClasses
): Constructor<MergeClasses<TBaseClasses>> {  const CombinedClass = BaseClasses.reduce(
    (Base: Constructor, Current: Constructor) => {
      return class extends Base {
        constructor(...args: any[]) {
          super(...args);
          Reflect.construct(Current, args, new.target);
        }
      };
    },
    class {} as Constructor
  );

  class Combined extends CombinedClass {
    constructor(...args: any[]) {
      super(...args);

      BaseClasses.forEach((BaseClass) => {
        let current: any = BaseClass;
        while (current && typeof current === "function") {
          if (current.prototype) {
            Object.assign(this, new current(...args));
          }
          current = Object.getPrototypeOf(current);
        }
      });
    }

    static [Symbol.hasInstance](instance: any) {
      return BaseClasses.some((BaseClass) => instance instanceof BaseClass);
    }
  }

  function copyProperties(target: any, source: any) {
    if (['function', 'object'].includes(typeof source)) {
      Reflect.ownKeys(source).forEach((key) => {
        if (!["prototype", "name", "length"].includes(key as string)) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)!
          );
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

  return Combined as any;
}

export { alchemize };
