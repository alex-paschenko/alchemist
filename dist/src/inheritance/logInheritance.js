import { buildProtoChain } from './buildProtoChain';
export function logInheritance(instance, place = 'unknown') {
    const chain = buildProtoChain(instance);
    console.log(`[${place}]: ${chain.join(' <- ')}`);
}
;
//# sourceMappingURL=logInheritance.js.map