import { alchemize } from '../../src/alchemize';

describe('alchemize - built-in classes', () => {
  class SomeClass {
    someMethod () { return 'some' }
  }

  it('should handle Array correctly', () => {
    class CustomArray extends Array {
      customMethod() {
        return 'Custom Array Method';
      }
    }

    const ins = new CustomArray();

    const Combined = alchemize(CustomArray, SomeClass);
    const instance = new Combined();

    instance.push(1, 2, 3);
    expect(instance.length).toBe(3);
    expect(instance[0]).toBe(1);
    expect(instance.customMethod()).toBe('Custom Array Method');
  });

  it('should handle Map correctly', () => {
    class CustomMap extends Map {
      customMethod() {
        return 'Custom Map Method';
      }
    }

    const Combined = alchemize(CustomMap, SomeClass);
    const instance = new Combined();

    instance.set('key', 'value');
    expect(instance.get('key')).toBe('value');
    expect(instance.customMethod()).toBe('Custom Map Method');
  });

  it('should handle Set correctly', () => {
    class CustomSet extends Set {
      customMethod() {
        return 'Custom Set Method';
      }
    }

    const Combined = alchemize(CustomSet, SomeClass);
    const instance = new Combined();

    instance.add(1);
    expect(instance.has(1)).toBe(true);
    expect(instance.customMethod()).toBe('Custom Set Method');
  });

  it('should handle Date correctly', () => {
    class CustomDate extends Date {
      customMethod() {
        return 'Custom Date Method';
      }
    }

    const Combined = alchemize(CustomDate, SomeClass);
    const instance = new Combined();

    expect(instance.customMethod()).toBe('Custom Date Method');
  });

  it('should handle RegExp correctly', () => {
    class CustomRegExp extends RegExp {
      customMethod() {
        return 'Custom RegExp Method';
      }
    }

    const Combined = alchemize(CustomRegExp, SomeClass);
    const instance = new Combined('abc');

    expect(instance.test('abc')).toBe(true);
    expect(instance.customMethod()).toBe('Custom RegExp Method');
  });

  it('should handle Error correctly', () => {
    class CustomError extends Error {
      customMethod() {
        return 'Custom Error Method';
      }
    }

    const Combined = alchemize(CustomError, SomeClass);
    const instance = new Combined('Test error');

    expect(instance.message).toBe('Test error');
    expect(instance.customMethod()).toBe('Custom Error Method');
  });

  it('should handle Promise correctly', async () => {
    class CustomPromise extends Promise<any> {
      customMethod() {
        return 'Custom Promise Method';
      }
    }

    const Combined = alchemize(CustomPromise, SomeClass);
    const instance = new Combined((resolve: (p: string) => any) => resolve('done'));

    const result = await instance;
    expect(result).toBe('done');
    expect(instance.customMethod()).toBe('Custom Promise Method');
  });

  it('should handle TypedArray correctly', () => {
    class CustomTypedArray extends Uint8Array {
      customMethod() {
        return 'Custom TypedArray Method';
      }
    }

    const Combined = alchemize(CustomTypedArray, SomeClass);
    const instance = new Combined(10);

    expect(instance.length).toBe(10);
    instance[0] = 255;
    expect(instance[0]).toBe(255);
    expect(instance.customMethod()).toBe('Custom TypedArray Method');
  });
});
