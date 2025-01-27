import { hasInstance } from '../../src/inheritance/hasInstance';
import { checkInheritance } from '../../src/constants';

// Mock class for testing
class Base {}
class Derived extends Base {}
class Unrelated {}

describe('hasInstance', () => {
  it('should return true if the instance is directly an instance of the class', () => {
    const instance = new Base();
    expect(hasInstance(instance, Base)).toBe(true);
  });

  it('should return true if the instance is an instance of a derived class', () => {
    const instance = new Derived();
    expect(hasInstance(instance, Base)).toBe(true);
    expect(hasInstance(instance, Derived)).toBe(true);
  });

  it('should return false if the instance is not related to the class', () => {
    const instance = new Unrelated();
    expect(hasInstance(instance, Base)).toBe(false);
    expect(hasInstance(instance, Derived)).toBe(false);
  });

  it('should return true if the instance implements checkInheritance and confirms inheritance', () => {
    class CustomClass {
      [checkInheritance](klass: any) {
        return klass === Derived;
      }
    }

    const instance = new CustomClass();
    expect(hasInstance(instance, Derived)).toBe(true);
    expect(hasInstance(instance, Base)).toBe(false);
  });

  it('should return false if checkInheritance is implemented but does not confirm inheritance', () => {
    class CustomClass {
      [checkInheritance](klass: any) {
        return false;
      }
    }

    const instance = new CustomClass();
    expect(hasInstance(instance, Base)).toBe(false);
    expect(hasInstance(instance, Derived)).toBe(false);
  });

  it('should handle instances with a broken prototype chain gracefully', () => {
    const instance = Object.create(null); // No prototype
    expect(hasInstance(instance, Base)).toBe(false);
  });

  it('should return false if instance is not an object or has no prototype chain', () => {
    expect(hasInstance(null, Base)).toBe(false);
    expect(hasInstance(undefined, Base)).toBe(false);
    expect(hasInstance(42, Base)).toBe(false);
    expect(hasInstance('string', Base)).toBe(false);
    expect(hasInstance(true, Base)).toBe(false);
  });

  it('should handle edge case where instance is a class itself', () => {
    expect(hasInstance(Base, Object)).toBe(true); // Base is an instance of Function
    expect(hasInstance(Base, Base)).toBe(false); // Base is not an instance of itself
  });

  it('should handle self-reference with checkInheritance', () => {
    class CustomClass {
      [checkInheritance](klass: any) {
        return klass === CustomClass;
      }
    }

    const instance = new CustomClass();
    expect(hasInstance(instance, CustomClass)).toBe(true);
  });

  it('should correctly traverse the prototype chain', () => {
    class GrandParent {}
    class Parent extends GrandParent {}
    class Child extends Parent {}

    const instance = new Child();

    expect(hasInstance(instance, Child)).toBe(true);
    expect(hasInstance(instance, Parent)).toBe(true);
    expect(hasInstance(instance, GrandParent)).toBe(true);
    expect(hasInstance(instance, Base)).toBe(false);
  });
});
