type Constructor<T = {}> = new (...args: any[]) => T;

function alchemize<TBaseClasses extends Constructor[]>(
  ...BaseClasses: TBaseClasses
): Constructor<InstanceType<TBaseClasses[number]>> & {
  [K in keyof TBaseClasses[number]]: TBaseClasses[number][K];
} {

  const CombinedClass = BaseClasses.reduce(
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
        while (current) {
          Object.assign(this, new current(...args));
          current = Object.getPrototypeOf(current);
        }
      });
    }
  }

  function copyProperties(target: any, source: any) {
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

  BaseClasses.forEach((BaseClass) => {
    let current = BaseClass;
    while (current) {
      copyProperties(Combined, current);
      copyProperties(Combined.prototype, current.prototype);
      current = Object.getPrototypeOf(current);
    }
  });

  Combined[Symbol.hasInstance] = (instance: any) =>
    BaseClasses.some((BaseClass) => instance instanceof BaseClass);

  return Combined as any;
}

export { alchemize };
