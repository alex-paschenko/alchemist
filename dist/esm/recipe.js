import { alchemize } from './alchemize';
import { recipeIdentity } from './constants';
import { AlchemistError } from './errors';
import { recipeKeys } from './interfaces';
import { validatePassOutParamRules } from './passOutParams';
const validator = {
    passOutParamRules: validatePassOutParamRules,
};
function recipe(params) {
    if (params === null || typeof params !== 'object') {
        throw new AlchemistError('E001');
    }
    for (const [key, value] of Object.entries(params)) {
        if (!recipeKeys.includes(key)) {
            throw new AlchemistError('E002', key);
        }
        if (validator[key]) {
            if (validator[key]) {
                validator[key](value);
            }
        }
    }
    return {
        alchemize: alchemize.bind(null, Object.assign(Object.assign({}, params), { [recipeIdentity]: true }))
    };
}
export { recipe };
//# sourceMappingURL=recipe.js.map