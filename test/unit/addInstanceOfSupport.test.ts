import { addInstanceOfSupport } from '../../src/inheritance/addInstanceOfSupport';
import { configureHasInstance } from '../../src/inheritance/configureHasInstance';
import { Constructor } from '../../src/interfaces';

// Mock configureHasInstance
jest.mock('../../src/inheritance/configureHasInstance', () => ({
  configureHasInstance: jest.fn(),
}));

describe('addInstanceOfSupport', () => {
  const mockedConfigureHasInstance = jest.mocked(configureHasInstance, { shallow: true });

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should call configureHasInstance for each class and its prototype chain when instanceOfSupport is true', () => {  class BaseClass {}
    class DerivedClass extends BaseClass {}

    addInstanceOfSupport([DerivedClass], true);

    // Collect the prototype chain
    const chain: any = [];
    let currentClass: any = DerivedClass;
    while (currentClass && typeof currentClass === 'function') {
      chain.push(currentClass);
      currentClass = Object.getPrototypeOf(currentClass);
    }

    // Verify configureHasInstance was called for each class in the chain
    chain.forEach((cls: any) => {
      expect(mockedConfigureHasInstance).toHaveBeenCalledWith(cls);
    });
  });

  it('should not call configureHasInstance when instanceOfSupport is false', () => {
    class BaseClass {}
    class DerivedClass extends BaseClass {}

    // Call the function with instanceOfSupport disabled
    addInstanceOfSupport([DerivedClass], false);

    // Ensure configureHasInstance was not called
    expect(mockedConfigureHasInstance).not.toHaveBeenCalled();
  });

  it('should handle an empty array of classes without errors', () => {
    // Call the function with an empty array
    expect(() => addInstanceOfSupport([], true)).not.toThrow();

    // Ensure configureHasInstance was not called
    expect(mockedConfigureHasInstance).not.toHaveBeenCalled();
  });

  it('should skip non-function prototypes in the chain', () => {
    class CustomClass {}
    Object.setPrototypeOf(CustomClass, null); // Remove the prototype chain

    // Call the function
    addInstanceOfSupport([CustomClass], true);

    // Ensure only the class itself was processed
    expect(mockedConfigureHasInstance).toHaveBeenCalledWith(CustomClass);
    expect(mockedConfigureHasInstance).toHaveBeenCalledTimes(1);
  });

  it('should stop at the end of the prototype chain', () => {
    const MockClass = jest.fn();
    Object.setPrototypeOf(MockClass, null); // Break the prototype chain

    // Call the function
    addInstanceOfSupport([MockClass], true);

    // Ensure only the class itself was processed
    expect(mockedConfigureHasInstance).toHaveBeenCalledWith(MockClass);
    expect(mockedConfigureHasInstance).toHaveBeenCalledTimes(1);
  });

  it('should not throw when encountering non-class objects in the chain', () => {
    const InvalidClass: any = {};

    // Call the function with an invalid class
    expect(() => addInstanceOfSupport([InvalidClass], true)).not.toThrow();

    // Ensure configureHasInstance was not called
    expect(mockedConfigureHasInstance).not.toHaveBeenCalled();
  });
});
