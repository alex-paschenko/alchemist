import { alchemize } from '../src/alchemize';

describe('alchemize - getters and setters', () => {
  class A {
    private _valueA: string = 'defaultA';

    get valueA(): string {
      return this._valueA;
    }

    set valueA(newValue: string) {
      this._valueA = newValue;
    }
  }

  class B {
    private _valueB: number = 0;

    get valueB(): number {
      return this._valueB;
    }

    set valueB(newValue: number) {
      this._valueB = newValue;
    }
  }

  class C {
    private _valueC: boolean = false;

    get valueC(): boolean {
      return this._valueC;
    }

    set valueC(newValue: boolean) {
      this._valueC = newValue;
    }
  }

  const CombinedClass = alchemize(A, B, C);

  it('should get and set values for all getters and setters', () => {
    const instance = new CombinedClass();

    expect(instance.valueA).toBe('defaultA');
    expect(instance.valueB).toBe(0);
    expect(instance.valueC).toBe(false);

    instance.valueA = 'newA';
    instance.valueB = 42;
    instance.valueC = true;

    expect(instance.valueA).toBe('newA');
    expect(instance.valueB).toBe(42);
    expect(instance.valueC).toBe(true);
  });

  it('should not lose getter/setter functionality after inheritance', () => {
    class ExtendedCombined extends CombinedClass {
      private _extraValue: string = 'extra';

      get extraValue(): string {
        return this._extraValue;
      }

      set extraValue(newValue: string) {
        this._extraValue = newValue;
      }
    }

    const extendedInstance = new ExtendedCombined();

    expect(extendedInstance.valueA).toBe('defaultA');
    expect(extendedInstance.valueB).toBe(0);
    expect(extendedInstance.valueC).toBe(false);

    expect(extendedInstance.extraValue).toBe('extra');
    extendedInstance.extraValue = 'newExtra';
    expect(extendedInstance.extraValue).toBe('newExtra');
  });
});
