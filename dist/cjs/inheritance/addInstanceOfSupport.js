"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addInstanceOfSupport = addInstanceOfSupport;
const configureHasInstance_1 = require("./configureHasInstance");
function addInstanceOfSupport(classes, instanceOfSupport) {
    if (instanceOfSupport) {
        for (const klass of classes) {
            let currentClass = klass;
            while (typeof currentClass === 'function') {
                (0, configureHasInstance_1.configureHasInstance)(currentClass);
                currentClass = Object.getPrototypeOf(currentClass);
            }
        }
    }
}
;
//# sourceMappingURL=addInstanceOfSupport.js.map