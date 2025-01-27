import { buildProtoChain } from '../../src/inheritance/buildProtoChain';

describe('buildProtoChain', () => {
  it('should return the full prototype chain for a simple object', () => {
    class A {}
    class B extends A {}
    class C extends B {}

    const instance = new C();

    // Call the function
    const chain = buildProtoChain(instance);

    // Verify the prototype chain
    expect(chain).toEqual(['C', 'B', 'A', 'Object']);
  });

  it('should handle objects with no prototype chain', () => {
    const instance = Object.create(null); // Object with no prototype

    // Call the function
    const chain = buildProtoChain(instance);

    // Verify that the chain is empty
    expect(chain).toEqual([]);
  });

  it('should return ["Object"] for plain objects', () => {
    const instance = {};

    // Call the function
    const chain = buildProtoChain(instance);

    // Verify the prototype chain
    expect(chain).toEqual(['Object']);
  });

  it('should return the prototype chain for built-in types', () => {
    const instance = new Map();

    // Call the function
    const chain = buildProtoChain(instance);

    // Verify the prototype chain
    expect(chain).toEqual(['Map', 'Object']);
  });

  it('should return the prototype chain for an instance of a custom class', () => {
    class CustomClass {}

    const instance = new CustomClass();

    // Call the function
    const chain = buildProtoChain(instance);

    // Verify the prototype chain
    expect(chain).toEqual(['CustomClass', 'Object']);
  });

  it('should correctly handle classes with custom prototypes', () => {
    class CustomBase {}
    class CustomDerived extends CustomBase {}
    Object.setPrototypeOf(CustomDerived.prototype, null);

    const instance = new CustomDerived();

    // Call the function
    const chain = buildProtoChain(instance);

    // Verify the prototype chain
    expect(chain).toEqual(['CustomDerived']);
  });

  it('should include anonymous constructors in the chain', () => {
    const AnonymousClass = class {};
    const instance = new AnonymousClass();

    // Call the function
    const chain = buildProtoChain(instance);

    // Verify the prototype chain
    expect(chain).toEqual(['AnonymousClass', 'Object']);
  });

  it('should handle functions and their prototype chain', () => {
    function MyFunction() {}

    const chain = buildProtoChain(MyFunction);

    // Verify the prototype chain for functions
    expect(chain).toEqual(['Function', 'Object']);
  });

  it('should handle arrays correctly', () => {
    const instance: object[] = [];

    // Call the function
    const chain = buildProtoChain(instance);

    // Verify the prototype chain
    expect(chain).toEqual(['Array', 'Object']);
  });

  it('should handle null as the input gracefully', () => {
    // Call the function with null
    const chain = buildProtoChain(null as unknown as object);

    // Verify that the chain is empty
    expect(chain).toEqual([]);
  });

  it('should handle primitives gracefully', () => {
    // Call the function for different primitives
    expect(buildProtoChain(42 as unknown as object)).toEqual([]);
    expect(buildProtoChain('string' as unknown as object)).toEqual([]);
    expect(buildProtoChain(true as unknown as object)).toEqual([]);
    expect(buildProtoChain(undefined as unknown as object)).toEqual([]);
    expect(buildProtoChain(null as unknown as object)).toEqual([]);
  });
});
