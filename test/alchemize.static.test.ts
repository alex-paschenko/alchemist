import { alchemize } from '../src/alchemize';

describe('alchemize - static properties and methods', () => {
  class A {
    static staticValueA: string = 'defaultA';

    static staticMethodA(): string {
      return `Static Method A: ${this.staticValueA}`;
    }
  }

  class B {
    static staticValueB: number = 42;

    static staticMethodB(): string {
      return `Static Method B: ${this.staticValueB}`;
    }
  }

  class C {
    static staticValueC: boolean = false;

    static staticMethodC(): string {
      return `Static Method C: ${this.staticValueC}`;
    }
  }

  const CombinedClass = alchemize(A, B, C);

  it('should inherit static properties and methods from all base classes', () => {
    expect(CombinedClass.staticValueA).toBe('defaultA');
    expect(CombinedClass.staticValueB).toBe(42);
    expect(CombinedClass.staticValueC).toBe(false);

    expect(CombinedClass.staticMethodA()).toBe('Static Method A: defaultA');
    expect(CombinedClass.staticMethodB()).toBe('Static Method B: 42');
    expect(CombinedClass.staticMethodC()).toBe('Static Method C: false');
  });

  it('should allow modification of static properties', () => {
    CombinedClass.staticValueA = 'newA';
    CombinedClass.staticValueB = 100;
    CombinedClass.staticValueC = true;

    expect(CombinedClass.staticValueA).toBe('newA');
    expect(CombinedClass.staticValueB).toBe(100);
    expect(CombinedClass.staticValueC).toBe(true);

    expect(CombinedClass.staticMethodA()).toBe('Static Method A: newA');
    expect(CombinedClass.staticMethodB()).toBe('Static Method B: 100');
    expect(CombinedClass.staticMethodC()).toBe('Static Method C: true');
  });

  it('should not interfere with static properties of individual classes', () => {
    expect(A.staticValueA).toBe('defaultA');
    expect(B.staticValueB).toBe(42);
    expect(C.staticValueC).toBe(false);

    expect(A.staticMethodA()).toBe('Static Method A: defaultA');
    expect(B.staticMethodB()).toBe('Static Method B: 42');
    expect(C.staticMethodC()).toBe('Static Method C: false');
  });
});
