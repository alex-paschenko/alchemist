import { recipeKeys } from './interfaces';
const multipleRecipeKeys = recipeKeys.length > 1;
const errors = {
    E001: `Recipe parameter must be an object with optional key${multipleRecipeKeys ? 's' : ''}: ` +
        `${recipeKeys.join(', ')}`,
    E002: (args) => `Unknown key "${args[0]}" in recipe parameters. Valid key${multipleRecipeKeys ? 's' : ''}` +
        ` ${multipleRecipeKeys ? 'are' : 'is'}: ${recipeKeys.join(', ')}`,
    E010: 'The passOutParamRules must be an array.',
    E011: 'The passOutParamRules array can contain only one \'...\' element.',
    E012: (args) => `Invalid rule passOutParamRules[${args[0]}] (${args[1]}): rules must be integers or '...'.`,
    E100: (args) => `A rule passOutParamRules[${args[0]}]  (${args[1]}) exceeds the size of the parameters.`,
    E101: 'passOutParamRules: there are leftover parameters, but no \'...\' rule was specified.',
    E102: 'passOutParamRules: the number of rules must exactly match the number of classes passed to alchemize.',
};
class AlchemistError extends Error {
    constructor(code, ...args) {
        const error = errors[code];
        super(`[${code}]: ${typeof error === 'string' ? error : error(args)}`);
        this.name = 'AlchemistError';
        this.code = code;
    }
}
;
export { AlchemistError };
//# sourceMappingURL=errors.js.map