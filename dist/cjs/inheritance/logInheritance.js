"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInheritance = logInheritance;
const buildProtoChain_1 = require("./buildProtoChain");
function logInheritance(instance, place = 'unknown') {
    const chain = (0, buildProtoChain_1.buildProtoChain)(instance);
    console.log(`[${place}]: ${chain.join(' <- ')}`);
}
;
//# sourceMappingURL=logInheritance.js.map