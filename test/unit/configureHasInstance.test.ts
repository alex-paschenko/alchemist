import { configureHasInstance } from '../../src/inheritance/configureHasInstance';
import { hasInstance } from '../../src/inheritance/hasInstance';
import { processedClass } from '../../src/constants';

// Mock hasInstance
jest.mock('../../src/inheritance/hasInstance', () => ({
  hasInstance: jest.fn(),
}));

describe('configureHasInstance', () => {
  const mockedHasInstance = jest.mocked(hasInstance, { shallow: true });

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should define Symbol.hasInstance if it does not exist', () => {
    class TestClass {}

    configureHasInstance(TestClass);

    // Verify Symbol.hasInstance is defined
    expect(Object.getOwnPropertyDescriptor(TestClass, Symbol.hasInstance)).toBeDefined();

    // Test the behavior of the newly defined Symbol.hasInstance
    const instance = {};
    mockedHasInstance.mockReturnValue(true);
    expect(TestClass[Symbol.hasInstance](instance)).toBe(true);
    expect(mockedHasInstance).toHaveBeenCalledWith(instance, TestClass);
  });

  it('should wrap existing Symbol.hasInstance if it is configurable', () => {
    class TestClass {
      static [Symbol.hasInstance](instance: any) {
        return instance.custom === true;
      }
    }

    configureHasInstance(TestClass);

    // Verify Symbol.hasInstance is still defined
    const descriptor = Object.getOwnPropertyDescriptor(TestClass, Symbol.hasInstance);
    expect(descriptor).toBeDefined();
    expect(descriptor?.configurable).toBe(true);

    // Test the behavior of the wrapped Symbol.hasInstance
    const instance1 = { custom: true };
    const instance2 = { custom: false };

    mockedHasInstance.mockReturnValue(false);

    expect(TestClass[Symbol.hasInstance](instance1)).toBe(true); // Original logic
    expect(TestClass[Symbol.hasInstance](instance2)).toBe(false); // Mocked logic
    expect(mockedHasInstance).toHaveBeenCalledWith(instance2, TestClass);
  });

  it('should not override non-configurable Symbol.hasInstance', () => {
    class TestClass {}

    Object.defineProperty(TestClass, Symbol.hasInstance, {
      value: () => true,
      configurable: false,
    });

    configureHasInstance(TestClass);

    // Verify Symbol.hasInstance is not overridden
    const descriptor = Object.getOwnPropertyDescriptor(TestClass, Symbol.hasInstance);
    expect(descriptor).toBeDefined();
    expect(descriptor?.configurable).toBe(false);

    // Test the behavior of the original Symbol.hasInstance
    expect(TestClass[Symbol.hasInstance]({})).toBe(true);
    expect(mockedHasInstance).not.toHaveBeenCalled();
  });

  it('should not redefine Symbol.hasInstance if processedClass is already set', () => {
    class TestClass {}
    Object.defineProperty(TestClass, processedClass, {
      value: true,
      configurable: true,
      writable: false,
    });

    configureHasInstance(TestClass);

    // Verify Symbol.hasInstance was not redefined
    expect(Object.getOwnPropertyDescriptor(TestClass, Symbol.hasInstance)).toBeUndefined();
    expect(mockedHasInstance).not.toHaveBeenCalled();
  });

  it('should handle errors gracefully', () => {
    class TestClass {}

    // Mock Object.defineProperty to throw an error
    jest.spyOn(Object, 'defineProperty').mockImplementation(() => {
      throw new Error('Test error');
    });

    expect(() => configureHasInstance(TestClass)).not.toThrow();

    // Restore original implementation
    jest.restoreAllMocks();
  });
});
