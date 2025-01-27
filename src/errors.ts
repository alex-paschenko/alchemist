import { recipeKeys } from './interfaces';

const multipleRecipeKeys = recipeKeys.length > 1;

const errors: Record<string, string | ((args: (string | number)[]) => string)> = {
  E001: `Recipe parameter must be an object with optional key${multipleRecipeKeys ? 's' : ''}: ` +
    `${recipeKeys.join(', ')}`,
  E002: (args) => `Unknown key "${args[0]}" in recipe parameters. Valid key${multipleRecipeKeys ? 's' : ''}` +
    ` ${multipleRecipeKeys ? 'are' : 'is'}: ${recipeKeys.join(', ')}`,
  E010: 'The passOutParamRules must be an array.',
  E011: 'The passOutParamRules array can contain only one \'...\' element.',
  E012: (args) => `Invalid rule passOutParamRules[${args[0]}] (${args[1]}): rules must be integers or '...'.`,

  E050: 'You must pass at least two classes to alchemize.',
  E051: (index) => `Invalid alchemize argument with index ${index}: all arguments must be classes`,

  E100: (args) => `A rule passOutParamRules[${args[0]}]  (${args[1]}) exceeds the size of the parameters.`,
  E101: 'passOutParamRules: there are leftover parameters, but no \'...\' rule was specified.',
  E102: 'passOutParamRules: the number of rules must exactly match the number of classes passed to alchemize.',
};

class AlchemistError extends Error {
  constructor(code: string, ...args: (string | number)[]) {
    const error = errors[code as keyof typeof errors];
    super(`[${code}]: ${typeof error === 'string' ? error : error(args)}`);
    this.name = 'AlchemistError';
    this.code = code;
  }

  public code: string;
};

export { AlchemistError };
