import { checkInheritance } from '../constants';
import { Constructor } from '../interfaces';

export function hasInstance(instance: any, klass: Constructor): boolean {
  if (instance?.[checkInheritance]) {
    return instance[checkInheritance].call(instance, klass) as boolean;
  } else {
    let proto = instance;
    while (proto) {
      if (proto === klass.prototype) return true;
      proto = Object.getPrototypeOf(proto);
    }
    return false;
  }
};
