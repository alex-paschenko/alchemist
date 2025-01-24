import { passOutSlices } from '../src/passOutParamRules';
import { AlchemistError } from '../src/errors';

describe('passOutSlices', () => {
  it('should return numOfClasses arrays with inputArray when passOutParamRules is missing', () => {
    const inputArray = [1, 2, 3];
    const numOfClasses = 3;
    const result = passOutSlices(inputArray, numOfClasses);
    expect(result).toEqual([[1, 2, 3], [1, 2, 3], [1, 2, 3]]);
  });

  it('should return numOfClasses arrays with inputArray when passOutParamRules is an empty array', () => {
    const inputArray = [1, 2, 3];
    const numOfClasses = 2;
    const passOutParamRules: number[] = [];
    const result = passOutSlices(inputArray, numOfClasses, passOutParamRules);
    expect(result).toEqual([[1, 2, 3], [1, 2, 3]]);
  });

  it('should split the array correctly with valid rules', () => {
    const inputArray = [1, 2, 3, 4, 5, 6];
    const numOfClasses = 3;
    const passOutParamRules = [2, '...', -2];
    const result = passOutSlices(inputArray, numOfClasses, passOutParamRules as any);
    expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
  });

  it('should return empty arrays for rules with value 0', () => {
    const inputArray = [1, 2, 3, 4];
    const numOfClasses = 3;
    const passOutParamRules = [2, 0, '...'];
    const result = passOutSlices(inputArray, numOfClasses, passOutParamRules as any);
    expect(result).toEqual([[1, 2], [], [3, 4]]);
  });

  it('should throw E100 when a rule exceeds the size of the input array', () => {
    const inputArray = [1, 2];
    const numOfClasses = 2;
    const passOutParamRules = [3];
    expect(() => passOutSlices(inputArray, numOfClasses, passOutParamRules)).toThrow(AlchemistError);
    try {
      passOutSlices(inputArray, numOfClasses, passOutParamRules);
    } catch (e) {
      expect(e).toBeInstanceOf(AlchemistError);
      expect((e as AlchemistError).code).toBe('E100');
    }
  });

  it('should throw E101 when there are leftover elements and no ... rule', () => {
    const inputArray = [1, 2, 3, 4];
    const numOfClasses = 2;
    const passOutParamRules = [2];
    expect(() => passOutSlices(inputArray, numOfClasses, passOutParamRules)).toThrow(AlchemistError);
    try {
      passOutSlices(inputArray, numOfClasses, passOutParamRules);
    } catch (e) {
      expect(e).toBeInstanceOf(AlchemistError);
      expect((e as AlchemistError).code).toBe('E101');
    }
  });

  it('should throw E102 when result length does not match numOfClasses', () => {
    const inputArray = [1, 2, 3, 4];
    const numOfClasses = 2;
    const passOutParamRules = [2, '...'];
    expect(() => passOutSlices(inputArray, numOfClasses + 1, passOutParamRules as any)).toThrow(AlchemistError);
    try {
      passOutSlices(inputArray, numOfClasses + 1, passOutParamRules as any);
    } catch (e) {
      expect(e).toBeInstanceOf(AlchemistError);
      expect((e as AlchemistError).code).toBe('E102');
    }
  });

  it('should handle rules with only negative numbers', () => {
    const inputArray = [1, 2, 3, 4, 5];
    const numOfClasses = 2;
    const passOutParamRules = [-2, '...'];
    const result = passOutSlices(inputArray, numOfClasses, passOutParamRules as any);
    expect(result).toEqual([[4, 5], [1, 2, 3]]);
  });

  it('should handle rules with only positive numbers', () => {
    const inputArray = [1, 2, 3, 4, 5];
    const numOfClasses = 2;
    const passOutParamRules = [3, '...'];
    const result = passOutSlices(inputArray, numOfClasses, passOutParamRules as any);
    expect(result).toEqual([[1, 2, 3], [4, 5]]);
  });

  it('should handle an empty input array', () => {
    const inputArray: number[] = [];
    const numOfClasses = 2;
    const passOutParamRules = [0, '...'];
    const result = passOutSlices(inputArray, numOfClasses, passOutParamRules as any);
    expect(result).toEqual([[], []]);
  });
});
