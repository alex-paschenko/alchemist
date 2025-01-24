"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipe = recipe;
const alchemize_1 = require("./alchemize");
const constants_1 = require("./constants");
const errors_1 = require("./errors");
const interfaces_1 = require("./interfaces");
const passOutParamRules_1 = require("./passOutParamRules");
const validator = {
    passOutParamRules: passOutParamRules_1.validatePassOutParamRules,
};
function recipe(params) {
    if (params === null || typeof params !== 'object') {
        throw new errors_1.AlchemistError('E001');
    }
    for (const [key, value] of Object.entries(params)) {
        if (!interfaces_1.recipeKeys.includes(key)) {
            throw new errors_1.AlchemistError('E002', key);
        }
        if (validator[key]) {
            if (validator[key]) {
                validator[key](value);
            }
        }
    }
    return {
        alchemize: alchemize_1.alchemize.bind(null, Object.assign(Object.assign({}, params), { [constants_1.recipeIdentity]: true }))
    };
}
//# sourceMappingURL=recipe.js.map