import { alchemize } from '../../src/alchemize';
import { recipeIdentity } from '../../src/constants';
import { passOutSlices } from '../../src/passOutParams';
import { addInstanceOfSupport } from '../../src/inheritance/addInstanceOfSupport';
import { AlchemistError } from '../../src/errors';
import { Constructor } from '../../src/interfaces';

jest.mock('../../src/passOutParams', () => ({
  passOutSlices: jest.fn(() => [[], [], []]),
}));

jest.mock('../../src/inheritance/addInstanceOfSupport', () => ({
  addInstanceOfSupport: jest.fn(),
}));

describe('alchemize - recipe as first argument', () => {
  const mockedPassOutSlices = jest.mocked(passOutSlices);
  const mockedAddInstanceOfSupport = jest.mocked(addInstanceOfSupport);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process recipe and combine classes', () => {
    const recipe = {
      [recipeIdentity]: true,
      instanceOfSupport: true,
      passOutParamRules: [],
    };

    class ClassA {
      static staticMethodA() {
        return 'Static A';
      }
      methodA() {
        return 'Instance A';
      }
    }

    class ClassB {
      static staticMethodB() {
        return 'Static B';
      }
      methodB() {
        return 'Instance B';
      }
    }

    const Combined = alchemize(recipe as unknown as Constructor, ClassA, ClassB);

    // Ensure addInstanceOfSupport was called
    expect(mockedAddInstanceOfSupport).toHaveBeenCalledWith([ClassA, ClassB], true);

    // Ensure passOutSlices was not directly called in the constructor
    const instance = new Combined();
    expect(mockedPassOutSlices).toHaveBeenCalledWith([], 2, recipe.passOutParamRules);

    // Verify Combined class has static methods from both classes
    expect(Combined.staticMethodA()).toBe('Static A');
    expect(Combined.staticMethodB()).toBe('Static B');

    // Verify instance methods
    expect(instance.methodA()).toBe('Instance A');
    expect(instance.methodB()).toBe('Instance B');
  });

  it('should throw an error if less than two base classes are provided', () => {
    const recipe = {
      [recipeIdentity]: true,
      instanceOfSupport: true,
    };

    class ClassA {}

    expect(() => alchemize(recipe as unknown as Constructor, ClassA))
      .toThrow(new AlchemistError('E050'));
  });

  it('should throw an error if any provided base class is not a class', () => {
    const recipe = {
      [recipeIdentity]: true,
      instanceOfSupport: true,
    };

    class ClassA {}
    const notAClass = {};

    expect(() => alchemize(recipe, ClassA, notAClass as any)).toThrow(new AlchemistError('E051', 1));
  });
});
