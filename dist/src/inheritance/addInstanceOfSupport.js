import { configureHasInstance } from './configureHasInstance';
export function addInstanceOfSupport(classes, instanceOfSupport) {
    if (instanceOfSupport) {
        for (const klass of classes) {
            let currentClass = klass;
            while (typeof currentClass === 'function') {
                configureHasInstance(currentClass);
                currentClass = Object.getPrototypeOf(currentClass);
            }
        }
    }
}
;
//# sourceMappingURL=addInstanceOfSupport.js.map