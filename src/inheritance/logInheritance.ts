import { Constructor } from '../interfaces';
import { buildProtoChain } from './buildProtoChain';

export function logInheritance(instance: Constructor, place: string = 'unknown'): void {
  const chain = buildProtoChain(instance);
  console.log(`[${place}]: ${chain.join(' <- ')}`);
};
