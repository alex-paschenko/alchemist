"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasInstance = hasInstance;
const constants_1 = require("../constants");
function hasInstance(instance, klass) {
    if (instance === null || instance === void 0 ? void 0 : instance[constants_1.checkInheritance]) {
        return instance[constants_1.checkInheritance].call(instance, klass);
    }
    else {
        let proto = instance;
        while (proto) {
            if (proto === klass.prototype)
                return true;
            proto = Object.getPrototypeOf(proto);
        }
        return false;
    }
}
;
//# sourceMappingURL=hasInstance.js.map