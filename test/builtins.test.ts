import { alchemize } from '../src/alchemize';

describe('alchemize - built-in classes', () => {
  it('should handle Array correctly', () => {
    class CustomArray extends Array {
      customMethod() {
        return 'Custom Array Method';
      }
    }

    const Combined = alchemize(CustomArray);
    const instance = new Combined();

    instance.push(1, 2, 3);
    expect(instance.length).toBe(3);
    expect(instance[0]).toBe(1);
    expect(instance.customMethod()).toBe('Custom Array Method');
    expect(instance instanceof CustomArray).toBe(true);
    expect(instance instanceof Array).toBe(true);
  });

  it('should handle Map correctly', () => {
    class CustomMap extends Map {
      customMethod() {
        return 'Custom Map Method';
      }
    }

    const Combined = alchemize(CustomMap);
    const instance = new Combined();

    instance.set('key', 'value');
    expect(instance.get('key')).toBe('value');
    expect(instance.customMethod()).toBe('Custom Map Method');
    expect(instance instanceof CustomMap).toBe(true);
    expect(instance instanceof Map).toBe(true);
  });

  it('should handle Set correctly', () => {
    class CustomSet extends Set {
      customMethod() {
        return 'Custom Set Method';
      }
    }

    const Combined = alchemize(CustomSet);
    const instance = new Combined();

    instance.add(1);
    expect(instance.has(1)).toBe(true);
    expect(instance.customMethod()).toBe('Custom Set Method');
    expect(instance instanceof CustomSet).toBe(true);
    expect(instance instanceof Set).toBe(true);
  });

  it('should handle Date correctly', () => {
    class CustomDate extends Date {
      customMethod() {
        return 'Custom Date Method';
      }
    }

    const Combined = alchemize(CustomDate);
    const instance = new Combined();

    expect(instance instanceof CustomDate).toBe(true);
    expect(instance instanceof Date).toBe(true);
    expect(instance.customMethod()).toBe('Custom Date Method');
    expect(typeof instance.toISOString()).toBe('string');
  });

  it('should handle RegExp correctly', () => {
    class CustomRegExp extends RegExp {
      customMethod() {
        return 'Custom RegExp Method';
      }
    }

    const Combined = alchemize(CustomRegExp);
    const instance = new Combined('abc');

    expect(instance.test('abc')).toBe(true);
    expect(instance.customMethod()).toBe('Custom RegExp Method');
    expect(instance instanceof CustomRegExp).toBe(true);
    expect(instance instanceof RegExp).toBe(true);
  });

  it('should handle Error correctly', () => {
    class CustomError extends Error {
      customMethod() {
        return 'Custom Error Method';
      }
    }

    const Combined = alchemize(CustomError);
    const instance = new Combined('Test error');

    expect(instance.message).toBe('Test error');
    expect(instance.customMethod()).toBe('Custom Error Method');
    expect(instance instanceof CustomError).toBe(true);
    expect(instance instanceof Error).toBe(true);
  });

  it('should handle Promise correctly', async () => {
    class CustomPromise extends Promise<any> {
      customMethod() {
        return 'Custom Promise Method';
      }
    }

    const Combined = alchemize(CustomPromise);
    const instance = new Combined((resolve) => resolve('done'));

    const result = await instance;
    expect(result).toBe('done');
    expect(instance.customMethod()).toBe('Custom Promise Method');
    expect(instance instanceof CustomPromise).toBe(true);
    expect(instance instanceof Promise).toBe(true);
  });

  it('should handle TypedArray correctly', () => {
    class CustomTypedArray extends Uint8Array {
      customMethod() {
        return 'Custom TypedArray Method';
      }
    }

    const Combined = alchemize(CustomTypedArray);
    const instance = new Combined(10);

    expect(instance.length).toBe(10);
    instance[0] = 255;
    expect(instance[0]).toBe(255);
    expect(instance.customMethod()).toBe('Custom TypedArray Method');
    expect(instance instanceof CustomTypedArray).toBe(true);
    expect(instance instanceof Uint8Array).toBe(true);
  });
});
