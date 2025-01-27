import { checkInheritance } from '../constants';
export function hasInstance(instance, klass) {
    if (instance === null || instance === void 0 ? void 0 : instance[checkInheritance]) {
        return instance[checkInheritance].call(instance, klass);
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