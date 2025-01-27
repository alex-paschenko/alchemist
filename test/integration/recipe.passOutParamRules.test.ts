import { recipe } from '../../src/recipe';

describe('recipe - passOutParamRules', () => {
  const MockedA = jest.fn();
  const MockedB = jest.fn();
  const MockedC = jest.fn();
  const MockedD = jest.fn();

  jest.spyOn(Function.prototype, 'toString').mockImplementation(function (this: Function) {
    if ([MockedA, MockedB, MockedC, MockedD].includes(this as any)) {
      return 'class MockedN {}';
    }
    return Function.prototype.toString.apply(this);
  });

  const params = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('without passOutParamRules: all arguments should be passed to all constructors', () => {
    const Combined = recipe({})
      .alchemize(MockedA, MockedB, MockedC, MockedD);
    new Combined(...params);

    expect(MockedA).toHaveBeenCalledTimes(1);
    expect(MockedA).toHaveBeenCalledWith(...params);
    expect(MockedB).toHaveBeenCalledTimes(1);
    expect(MockedB).toHaveBeenCalledWith(...params);
    expect(MockedC).toHaveBeenCalledTimes(1);
    expect(MockedC).toHaveBeenCalledWith(...params);
    expect(MockedD).toHaveBeenCalledTimes(1);
    expect(MockedD).toHaveBeenCalledWith(...params);
  });

  it('passOutParamRules is an empty array: all arguments should be passed to all constructors', () => {
    const Combined = recipe({ passOutParamRules: [] })
      .alchemize(MockedA, MockedB, MockedC, MockedD);
    new Combined(...params);

    expect(MockedA).toHaveBeenCalledTimes(1);
    expect(MockedA).toHaveBeenCalledWith(...params);
    expect(MockedB).toHaveBeenCalledTimes(1);
    expect(MockedB).toHaveBeenCalledWith(...params);
    expect(MockedC).toHaveBeenCalledTimes(1);
    expect(MockedC).toHaveBeenCalledWith(...params);
    expect(MockedD).toHaveBeenCalledTimes(1);
    expect(MockedD).toHaveBeenCalledWith(...params);
  });

  it(
    'passOutParamRules is an array of positive numbers',
    () => {
      const Combined = recipe({ passOutParamRules: [2, 1, 0, 7] })
        .alchemize(MockedA, MockedB, MockedC, MockedD);
      new Combined(...params);

      expect(MockedA).toHaveBeenCalledTimes(1);
      expect(MockedA).toHaveBeenCalledWith(...[0, 1]);
      expect(MockedB).toHaveBeenCalledTimes(1);
      expect(MockedB).toHaveBeenCalledWith(...[2]);
      expect(MockedC).toHaveBeenCalledTimes(1);
      expect(MockedC).toHaveBeenCalledWith(...[]);
      expect(MockedD).toHaveBeenCalledTimes(1);
      expect(MockedD).toHaveBeenCalledWith(...[3, 4, 5, 6, 7, 8, 9]);
    }
  );

  it('passOutParamRules is an array of positive numbers', () => {
    const Combined = recipe({ passOutParamRules: [2, 1, 0, 7] })
      .alchemize(MockedA, MockedB, MockedC, MockedD);
    new Combined(...params);

    expect(MockedA).toHaveBeenCalledTimes(1);
    expect(MockedA).toHaveBeenCalledWith(...[0, 1]);
    expect(MockedB).toHaveBeenCalledTimes(1);
    expect(MockedB).toHaveBeenCalledWith(...[2]);
    expect(MockedC).toHaveBeenCalledTimes(1);
    expect(MockedC).toHaveBeenCalledWith(...[]);
    expect(MockedD).toHaveBeenCalledTimes(1);
    expect(MockedD).toHaveBeenCalledWith(...[3, 4, 5, 6, 7, 8, 9]);
  });

  it('passOutParamRules is an array of positive numbers', () => {
    const Combined = recipe({ passOutParamRules: [2, 1, 0, 7] })
      .alchemize(MockedA, MockedB, MockedC, MockedD);
    new Combined(...params);

    expect(MockedA).toHaveBeenCalledTimes(1);
    expect(MockedA).toHaveBeenCalledWith(...[0, 1]);
    expect(MockedB).toHaveBeenCalledTimes(1);
    expect(MockedB).toHaveBeenCalledWith(...[2]);
    expect(MockedC).toHaveBeenCalledTimes(1);
    expect(MockedC).toHaveBeenCalledWith(...[]);
    expect(MockedD).toHaveBeenCalledTimes(1);
    expect(MockedD).toHaveBeenCalledWith(...[3, 4, 5, 6, 7, 8, 9]);
  });

  it('passOutParamRules is an array of positive and negative numbers', () => {
    const Combined = recipe({ passOutParamRules: [2, -1, -3, 4] })
      .alchemize(MockedA, MockedB, MockedC, MockedD);
    new Combined(...params);

    expect(MockedA).toHaveBeenCalledTimes(1);
    expect(MockedA).toHaveBeenCalledWith(...[0, 1]);
    expect(MockedB).toHaveBeenCalledTimes(1);
    expect(MockedB).toHaveBeenCalledWith(...[9]);
    expect(MockedC).toHaveBeenCalledTimes(1);
    expect(MockedC).toHaveBeenCalledWith(...[6, 7, 8]);
    expect(MockedD).toHaveBeenCalledTimes(1);
    expect(MockedD).toHaveBeenCalledWith(...[2, 3, 4, 5]);
  });


  it('passOutParamRules is an array of positive and negative numbers plus "..."', () => {
    const Combined = recipe({ passOutParamRules: [2, -1, '...', 4] })
      .alchemize(MockedA, MockedB, MockedC, MockedD);
    new Combined(...params);

    expect(MockedA).toHaveBeenCalledTimes(1);
    expect(MockedA).toHaveBeenCalledWith(...[0, 1]);
    expect(MockedB).toHaveBeenCalledTimes(1);
    expect(MockedB).toHaveBeenCalledWith(...[9]);
    expect(MockedC).toHaveBeenCalledTimes(1);
    expect(MockedC).toHaveBeenCalledWith(...[6, 7, 8]);
    expect(MockedD).toHaveBeenCalledTimes(1);
    expect(MockedD).toHaveBeenCalledWith(...[2, 3, 4, 5]);
  });
})