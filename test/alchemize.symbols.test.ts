import { alchemize } from '../src/alchemize';

describe('alchemize - symbol properties and methods', () => {
  const symbolA = Symbol('symbolA');
  const symbolB = Symbol('symbolB');
  const symbolC = Symbol('symbolC');

  class A {
    static [symbolA] = 'Static Symbol A';
    [symbolA] = 'Instance Symbol A';

    static staticMethodA() {
      return 'Static Method A';
    }

    instanceMethodA() {
      return 'Instance Method A';
    }
  }

  class B {
    static [symbolB] = 'Static Symbol B';
    [symbolB] = 'Instance Symbol B';

    static staticMethodB() {
      return 'Static Method B';
    }

    instanceMethodB() {
      return 'Instance Method B';
    }
  }

  class C {
    static [symbolC] = 'Static Symbol C';
    [symbolC] = 'Instance Symbol C';

    static staticMethodC() {
      return 'Static Method C';
    }

    instanceMethodC() {
      return 'Instance Method C';
    }
  }

  const CombinedClass = alchemize(A, B, C);

  it('should combine static symbol properties', () => {
    expect(CombinedClass[symbolA]).toBe('Static Symbol A');
    expect(CombinedClass[symbolB]).toBe('Static Symbol B');
    expect(CombinedClass[symbolC]).toBe('Static Symbol C');
  });

  it('should combine instance symbol properties', () => {
    const instance = new CombinedClass();
    expect(instance[symbolA]).toBe('Instance Symbol A');
    expect(instance[symbolB]).toBe('Instance Symbol B');
    expect(instance[symbolC]).toBe('Instance Symbol C');
  });

  it('should combine static methods', () => {
    expect(CombinedClass.staticMethodA()).toBe('Static Method A');
    expect(CombinedClass.staticMethodB()).toBe('Static Method B');
    expect(CombinedClass.staticMethodC()).toBe('Static Method C');
  });

  it('should combine instance methods', () => {
    const instance = new CombinedClass();
    expect(instance.instanceMethodA()).toBe('Instance Method A');
    expect(instance.instanceMethodB()).toBe('Instance Method B');
    expect(instance.instanceMethodC()).toBe('Instance Method C');
  });

  it('should not interfere with individual classes', () => {
    expect(A[symbolA]).toBe('Static Symbol A');
    expect(B[symbolB]).toBe('Static Symbol B');
    expect(C[symbolC]).toBe('Static Symbol C');

    const instanceA = new A();
    const instanceB = new B();
    const instanceC = new C();

    expect(instanceA[symbolA]).toBe('Instance Symbol A');
    expect(instanceB[symbolB]).toBe('Instance Symbol B');
    expect(instanceC[symbolC]).toBe('Instance Symbol C');
  });
});
