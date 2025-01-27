import { checkInheritance, instances, prototypes, recipeIdentity } from './constants';
import { AlchemistError } from './errors';
import { addInstanceOfSupport } from './inheritance/addInstanceOfSupport';
import { Constructor, MergeClasses, Recipe, RecipeWithIdentity } from './interfaces';
import { passOutSlices } from './passOutParams';

// Combine multiple classes into a single class
function alchemize<TBaseClasses extends Constructor[]>(
  ...args: TBaseClasses
): MergeClasses<TBaseClasses> {
  const firstArgIsRecipe = (args[0] as unknown as RecipeWithIdentity)?.[recipeIdentity];
  const recipe: Recipe = firstArgIsRecipe
    ? (args[0] as unknown as RecipeWithIdentity)
    : {};

  const BaseClasses = (firstArgIsRecipe ? (args.slice(1) || []) : args) as TBaseClasses;
  if (BaseClasses.length < 2) {
    throw new AlchemistError('E050');
  }

  for (const [index, Class] of BaseClasses.entries()) {
    if (!(
      typeof Class === 'function' &&
        /^class\s/.test(Function.prototype.toString.call(Class))
    )) {
      throw new AlchemistError('E051', index);
    }
  }

  addInstanceOfSupport(BaseClasses, recipe.instanceOfSupport);

  // Define the combined class
  class Combined {
    constructor(...args: any[]) {
      const splittedArgs = passOutSlices(
        args,
        BaseClasses.length,
        recipe.passOutParamRules
      );

      this[instances] = [];

      for (const Class of BaseClasses) {
        const instance = new Class(...(splittedArgs.shift() as any[]));
        this[instances].push(instance);
      }

      return new Proxy(this, {
        get(target, prop, receiver) {
          for (const instance of target[instances]) {
            if (prop in instance) {
              const value = instance[prop];
              if (typeof value === 'function') {
                return (...args: any[]) => Reflect.apply(value, instance, args);
              }
              return value;
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

    public [checkInheritance] (klass: Constructor) {
      for (const proto of this[prototypes]) {
        let currentClass = proto;
        while (typeof currentClass === 'function') {
          if (currentClass === klass) {
            return true;
          }
          currentClass = Object.getPrototypeOf(currentClass);
        }
      }
      return false;
    };

    private [instances]: any;

    private [prototypes] = BaseClasses;
  }

  // Copy static properties and methods
  BaseClasses.forEach((BaseClass) => {
    Reflect.ownKeys(BaseClass).forEach((key) => {
      if (!["prototype", "length", "name"].includes(key as string)) {
        const descriptor = Object.getOwnPropertyDescriptor(BaseClass, key);
        if (descriptor) {
          const existingDescriptor = Object.getOwnPropertyDescriptor(Combined, key);
          if (!existingDescriptor || existingDescriptor.configurable) {
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
