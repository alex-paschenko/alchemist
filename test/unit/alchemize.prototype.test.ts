import { alchemize } from '../../src/alchemize';

describe('alchemize - prototype chain inheritance', () => {
  class A {
    methodA() {
      return 'Method A';
    }
  }

  class B extends A {
    methodB() {
      return 'Method B';
    }
  }

  class C extends B {
    methodC() {
      return 'Method C';
    }
  }

  const CombinedClass = alchemize(A, B, C);

  it('should inherit methods through the prototype chain', () => {
    const instance = new CombinedClass();

    // Check if methods exist on the instance via prototype chain
    expect(instance.methodA()).toBe('Method A');
    expect(instance.methodB()).toBe('Method B');
    expect(instance.methodC()).toBe('Method C');

    // Ensure methods are not own properties
    expect(instance.hasOwnProperty('methodA')).toBe(false);
    expect(instance.hasOwnProperty('methodB')).toBe(false);
    expect(instance.hasOwnProperty('methodC')).toBe(false);

    // Verify prototype chain
    const prototypeChain: object[] = [];
    let proto: object | null = Object.getPrototypeOf(instance);

    while (proto) {
      prototypeChain.push(proto);
      proto = Object.getPrototypeOf(proto);
    }

    // Ensure the prototype chain includes the prototypes of all base classes
    expect(prototypeChain.some((proto: any) => proto.hasOwnProperty('methodA'))).toBe(true);
    expect(prototypeChain.some((proto: any) => proto.hasOwnProperty('methodB'))).toBe(true);
    expect(prototypeChain.some((proto: any) => proto.hasOwnProperty('methodC'))).toBe(true);
  });

  it('should recursively copy properties and methods from all parent classes', () => {
    class Parent {
      parentMethod() {
        return 'Parent Method';
      }
    }

    class Child extends Parent {
      childMethod() {
        return 'Child Method';
      }
    }

    class GrandChild extends Child {
      grandChildMethod() {
        return 'GrandChild Method';
      }
    }

    const ExtendedCombinedClass = alchemize(Parent, Child, GrandChild);
    const instance = new ExtendedCombinedClass();

    // Verify all methods are copied
    expect(instance.parentMethod()).toBe('Parent Method');
    expect(instance.childMethod()).toBe('Child Method');
    expect(instance.grandChildMethod()).toBe('GrandChild Method');

    // Ensure methods are not own properties
    expect(instance.hasOwnProperty('parentMethod')).toBe(false);
    expect(instance.hasOwnProperty('childMethod')).toBe(false);
    expect(instance.hasOwnProperty('grandChildMethod')).toBe(false);

    // Verify prototype chain includes all methods
    const prototypeChain: object[] = [];
    let proto: object | null = Object.getPrototypeOf(instance);

    while (proto) {
      prototypeChain.push(proto);
      proto = Object.getPrototypeOf(proto);
    }

    expect(prototypeChain.some((proto: any) => proto.hasOwnProperty('parentMethod'))).toBe(true);
    expect(prototypeChain.some((proto: any) => proto.hasOwnProperty('childMethod'))).toBe(true);
    expect(prototypeChain.some((proto: any) => proto.hasOwnProperty('grandChildMethod'))).toBe(true);
  });
});
