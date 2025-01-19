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

  it('should merge three classes', () => {
    class A {
      a = "a";
    }

    class B {
      b = "b";
    }

    class C {
      c = "c";
    }

    const D = alchemize(A, B, C);

    const d = new D();

    expect(d.a).toBe("a");
    expect(d.b).toBe("b");
    expect(d.c).toBe("c");
  });
});