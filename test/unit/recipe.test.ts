import { recipe } from '../../src/recipe';
import { alchemize } from '../../src/alchemize';
import { AlchemistError } from '../../src/errors';
import { validatePassOutParamRules } from '../../src/passOutParams';
import { Constructor, PassOutParamRule, recipeKeys } from '../../src/interfaces';
import { recipeIdentity } from '../../src/constants';

jest.mock('../../src/alchemize'); // Mock alchemize
jest.mock('../../src/passOutParams');

const mockAlchemize = alchemize as jest.Mock;
const mockValidatePassOutParamRules = validatePassOutParamRules as jest.Mock;

describe('recipe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw AlchemistError with code E001 if params is not an object', () => {
    expect(() => recipe(null as any)).toThrow(new AlchemistError('E001'));
    expect(() => recipe(undefined as any)).toThrow(new AlchemistError('E001'));
    expect(() => recipe('string' as any)).toThrow(new AlchemistError('E001'));
  });

  it('should throw AlchemistError with code E002 if params contain invalid keys', () => {
    const invalidParams = { invalidKey: 'value' };
    expect(() => recipe(invalidParams as any)).toThrow(new AlchemistError('E002', 'invalidKey'));
  });

  it('should accept instanceOfSupport in params', () => {
    const params = { instanceOfSupport: true };
    expect(() => recipe(params)).not.toThrow();
  });

  it('should call the appropriate validator for specific keys', () => {
    const params: { passOutParamRules: PassOutParamRule[] } =
      { passOutParamRules: [1, '...', 8] };

    recipe(params);

    expect(mockValidatePassOutParamRules).toHaveBeenCalledWith(params.passOutParamRules);
  });

  it('should not throw an error for valid keys and parameters', () => {
    const params: { passOutParamRules: PassOutParamRule[] } =
      { passOutParamRules: [1, '...', 8] };

    expect(() => recipe(params)).not.toThrow();
  });

  it('should return an object with alchemize bound to the provided params', () => {
    const params: { passOutParamRules: PassOutParamRule[] } =
      { passOutParamRules: [1, '...', 8] };

    const result = recipe(params);
    expect(typeof result.alchemize).toBe('function');

    // Mock implementation for alchemize
    mockAlchemize.mockImplementation(() => 'mockedResult');

    // Call the returned alchemize function
    const BaseClasses = [{} as Constructor];
    const returnValue = result.alchemize(...BaseClasses);

    expect(mockAlchemize).toHaveBeenCalledWith(
      { ...params, [recipeIdentity]: true },
      ...BaseClasses
    );
    expect(returnValue).toBe('mockedResult');
  });

  it('should not modify the original recipeKeys array', () => {
    const originalKeys = [...recipeKeys];
    const params: { passOutParamRules: PassOutParamRule[] } =
      { passOutParamRules: [1, '...', 8] };

    recipe(params);

    expect(recipeKeys).toEqual(originalKeys); // Ensure recipeKeys is not modified
  });
});
