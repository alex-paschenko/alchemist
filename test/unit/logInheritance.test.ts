import { logInheritance } from '../../src/inheritance/logInheritance';
import { buildProtoChain } from '../../src/inheritance/buildProtoChain';

jest.mock('../../src/inheritance/buildProtoChain', () => ({
  buildProtoChain: jest.fn(),
}));

describe('logInheritance', () => {
  const mockedBuildProtoChain = jest.mocked(buildProtoChain, { shallow: true });
  const originalConsoleLog = console.log;

  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn(); // Mock console.log
  });

  afterEach(() => {
    console.log = originalConsoleLog; // Restore console.log
  });

  it('should log the inheritance chain with the default place', () => {
    class TestClass {}

    mockedBuildProtoChain.mockReturnValue(['TestClass', 'Object']);

    logInheritance(TestClass);

    // Verify buildProtoChain was called with the correct instance
    expect(mockedBuildProtoChain).toHaveBeenCalledWith(TestClass);

    // Verify the log output
    expect(console.log).toHaveBeenCalledWith('[unknown]: TestClass <- Object');
  });

  it('should log the inheritance chain with a custom place', () => {
    class TestClass {}

    mockedBuildProtoChain.mockReturnValue(['TestClass', 'Object']);

    logInheritance(TestClass, 'customPlace');

    // Verify buildProtoChain was called with the correct instance
    expect(mockedBuildProtoChain).toHaveBeenCalledWith(TestClass);

    // Verify the log output
    expect(console.log).toHaveBeenCalledWith('[customPlace]: TestClass <- Object');
  });

  it('should handle an empty inheritance chain gracefully', () => {
    class TestClass {}

    mockedBuildProtoChain.mockReturnValue([]);

    logInheritance(TestClass);

    // Verify buildProtoChain was called with the correct instance
    expect(mockedBuildProtoChain).toHaveBeenCalledWith(TestClass);

    // Verify the log output
    expect(console.log).toHaveBeenCalledWith('[unknown]: ');
  });

  it('should handle a single class in the inheritance chain', () => {
    class SingleClass {}

    mockedBuildProtoChain.mockReturnValue(['SingleClass']);

    logInheritance(SingleClass, 'singlePlace');

    // Verify buildProtoChain was called with the correct instance
    expect(mockedBuildProtoChain).toHaveBeenCalledWith(SingleClass);

    // Verify the log output
    expect(console.log).toHaveBeenCalledWith('[singlePlace]: SingleClass');
  });
});
