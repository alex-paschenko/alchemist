import { recipe } from '../../src/recipe';

describe('recipe - instanceOfSupport', () => {
  it('without instanceOfSupport all instanceOf should be false', () => {
    class BaseA {};
    class BaseB {};
    class DerivedFromA extends BaseA {};
    class DeeplyDerivedFromA extends DerivedFromA {};
    class C {};

    const Combined = recipe({}).alchemize(DeeplyDerivedFromA, BaseB);
    const instance = new Combined();

    expect(instance instanceof BaseA).toBe(false);
    expect(instance instanceof BaseB).toBe(false);
    expect(instance instanceof DerivedFromA).toBe(false);
    expect(instance instanceof DeeplyDerivedFromA).toBe(false);
    expect(instance instanceof C).toBe(false);
  });

  it('with instanceOfSupport=false all instanceOf should be false', () => {
    class BaseA {};
    class BaseB {};
    class DerivedFromA extends BaseA {};
    class DeeplyDerivedFromA extends DerivedFromA {};
    class C {};

    const Combined = recipe({ instanceOfSupport: false }).alchemize(DeeplyDerivedFromA, BaseB);
    const instance = new Combined();

    expect(instance instanceof BaseA).toBe(false);
    expect(instance instanceof BaseB).toBe(false);
    expect(instance instanceof DerivedFromA).toBe(false);
    expect(instance instanceof DeeplyDerivedFromA).toBe(false);
    expect(instance instanceof C).toBe(false);
  });

  it('with instanceOfSupport=true all instanceOf should works', () => {
    class BaseA {};
    class BaseB {};
    class DerivedFromA extends BaseA {};
    class DeeplyDerivedFromA extends DerivedFromA {};
    class C {};

    const Combined = recipe({ instanceOfSupport: true }).alchemize(DeeplyDerivedFromA, BaseB);
    const instance = new Combined();

    expect(instance instanceof BaseA).toBe(true);
    expect(instance instanceof BaseB).toBe(true);
    expect(instance instanceof DerivedFromA).toBe(true);
    expect(instance instanceof DeeplyDerivedFromA).toBe(true);
  });
});
