import { Constructor } from '../interfaces';
import { configureHasInstance } from './configureHasInstance';

export function addInstanceOfSupport(
  classes: Constructor[],
  instanceOfSupport?: boolean
): void {
  if (instanceOfSupport) {
    for (const klass of classes) {
      let currentClass = klass;
      while (typeof currentClass === 'function') {
        configureHasInstance(currentClass);
        currentClass = Object.getPrototypeOf(currentClass);
      }
    }
  }
};
