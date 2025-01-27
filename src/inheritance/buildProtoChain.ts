export function  buildProtoChain(instance: object): string[] {
  const chain: string[] = [];
  if (!['object', 'function'].includes(typeof instance)) {
    return chain;
  }

  let prototype = instance;

  while (prototype) {
    prototype = Object.getPrototypeOf(prototype);
    if (prototype) {
      chain.push(prototype.constructor.name);
    }
  }

  return chain;
};
