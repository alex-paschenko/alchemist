export function buildProtoChain(instance) {
    const chain = [];
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
}
;
//# sourceMappingURL=buildProtoChain.js.map