import { alchemize } from '../src/alchemize';

describe('Simple merging', () => {
  it('should merge two classes', () => {
    class A {
      a = "a";
    }

    class B {
      b = "b";
    }

    const C = alchemize(A, B);

    const c = new C();

    expect(c.a).toBe("a");
    expect(c.b).toBe("b");
  });
});