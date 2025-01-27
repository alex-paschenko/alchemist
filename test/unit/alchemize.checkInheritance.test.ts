import { alchemize } from '../../src/alchemize';
import { checkInheritance } from '../../src/constants';

type InstanceWithCheckInheritance = { [checkInheritance]: (arg: any) => boolean };

describe('checkInheritance method', () => {
  it('should return true if the provided class is part of the inheritance chain', () => {
    class ClassA {}
    class ClassB {}
    class ClassC {}

    const Combined = alchemize(ClassA, ClassB, ClassC);
    const instance = new Combined() as InstanceWithCheckInheritance;

    // Test with ClassA
    expect(instance[checkInheritance](ClassA)).toBe(true);

    // Test with ClassB
    expect(instance[checkInheritance](ClassB)).toBe(true);

    // Test with ClassC
    expect(instance[checkInheritance](ClassC)).toBe(true);
  });

  it('should return false if the provided class is not part of the inheritance chain', () => {
    class ClassA {}
    class ClassB {}
    class ClassC {}
    class ClassD {}

    const Combined = alchemize(ClassA, ClassB, ClassC);
    const instance = new Combined() as InstanceWithCheckInheritance;

    // Test with ClassD
    expect(instance[checkInheritance](ClassD)).toBe(false);
  });

  it('should handle inheritance chains with extended classes correctly', () => {
    class Parent {}
    class Child extends Parent {}

    const Combined = alchemize(Parent, Child);
    const instance = new Combined() as InstanceWithCheckInheritance;

    // Test with Parent
    expect(instance[checkInheritance](Parent)).toBe(true);

    // Test with Child
    expect(instance[checkInheritance](Child)).toBe(true);
  });

  it('should return false if the argument is not a class', () => {
    class ClassA {}
    class ClassB {}
    const Combined = alchemize(ClassA, ClassB);
    const instance = new Combined() as InstanceWithCheckInheritance;

    // Test with a non-class argument
    expect(instance[checkInheritance]({} as any)).toBe(false);
    expect(instance[checkInheritance](null as any)).toBe(false);
    expect(instance[checkInheritance](undefined as any)).toBe(false);
    expect(instance[checkInheritance](123 as any)).toBe(false);
  });
});
