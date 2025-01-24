import { AlchemistError } from '../src/errors';
import { PassOutParamRule } from '../src/interfaces';
import { validatePassOutParamRules } from '../src/passOutParamRules';

describe('validatePassOutParamRules', () => {
  test('should pass with valid rules (no errors)', () => {
    const rules: PassOutParamRule[] = [3, '...', -2];
    expect(() => validatePassOutParamRules(rules)).not.toThrow();
  });

  test('should throw E010 when rules is not an array', () => {
    const invalidRules = "not an array";
    expect(() => validatePassOutParamRules(invalidRules as any)).toThrow(AlchemistError);
    try {
      validatePassOutParamRules(invalidRules as any);
    } catch (e) {
      expect(e).toBeInstanceOf(AlchemistError);
      expect((e as AlchemistError).code).toBe('E010');
    }
  });

  test('should throw E011 when there are multiple "..." in rules', () => {
    const rules: PassOutParamRule[] = [3, '...', -2, '...'];
    expect(() => validatePassOutParamRules(rules)).toThrow(AlchemistError);
    try {
      validatePassOutParamRules(rules);
    } catch (e) {
      expect(e).toBeInstanceOf(AlchemistError);
      expect((e as AlchemistError).code).toBe('E011');
    }
  });

  test('should throw E012 for invalid non-integer rule', () => {
    const rules = [3, 0.5, -2];
    expect(() => validatePassOutParamRules(rules)).toThrow(AlchemistError);
    try {
      validatePassOutParamRules(rules);
    } catch (e) {
      expect(e).toBeInstanceOf(AlchemistError);
      expect((e as AlchemistError).code).toBe('E012');
      expect((e as AlchemistError).message).toContain('[1] (0.5)');
    }
  });

  test('should throw E012 for invalid type rule', () => {
    const rules: PassOutParamRule[] = [3, 'invalid', -2] as PassOutParamRule[];
    expect(() => validatePassOutParamRules(rules)).toThrow(AlchemistError);
    try {
      validatePassOutParamRules(rules);
    } catch (e) {
      expect(e).toBeInstanceOf(AlchemistError);
      expect((e as AlchemistError).code).toBe('E012');
      expect((e as AlchemistError).message).toContain('[1] (invalid)');
    }
  });

  test('should throw E012 for rule with invalid index', () => {
    const rules = [3, {}, -2];
    expect(() => validatePassOutParamRules(rules as any)).toThrow(AlchemistError);
    try {
      validatePassOutParamRules(rules as any);
    } catch (e) {
      expect(e).toBeInstanceOf(AlchemistError);
      expect((e as AlchemistError).code).toBe('E012');
      expect((e as AlchemistError).message).toContain('[1] ([object Object])');
    }
  });

  test('should pass with rules containing only integers and "..."', () => {
    const rules = [3, -2, '...'];
    expect(() => validatePassOutParamRules(rules as any)).not.toThrow();
  });

  test('should throw E012 for NaN in rules', () => {
    const rules = [3, NaN, -2];
    expect(() => validatePassOutParamRules(rules)).toThrow(AlchemistError);
    try {
      validatePassOutParamRules(rules);
    } catch (e) {
      expect(e).toBeInstanceOf(AlchemistError);
      expect((e as AlchemistError).code).toBe('E012');
      expect((e as AlchemistError).message).toContain('[1] (NaN)');
    }
  });

  test('should throw E012 for Infinity in rules', () => {
    const rules = [3, Infinity, -2];
    expect(() => validatePassOutParamRules(rules)).toThrow(AlchemistError);
    try {
      validatePassOutParamRules(rules);
    } catch (e) {
      expect(e).toBeInstanceOf(AlchemistError);
      expect((e as AlchemistError).code).toBe('E012');
      expect((e as AlchemistError).message).toContain('[1] (Infinity)');
    }
  });

  test('should throw E012 for -Infinity in rules', () => {
    const rules = [3, -Infinity, -2];
    expect(() => validatePassOutParamRules(rules)).toThrow(AlchemistError);
    try {
      validatePassOutParamRules(rules);
    } catch (e) {
      expect(e).toBeInstanceOf(AlchemistError);
      expect((e as AlchemistError).code).toBe('E012');
      expect((e as AlchemistError).message).toContain('[1] (-Infinity)');
    }
  });
});
