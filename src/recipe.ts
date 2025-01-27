import { alchemize } from './alchemize';
import { recipeIdentity } from './constants';
import { AlchemistError } from './errors';
import { Constructor, Recipe, recipeKeys } from './interfaces';
import { validatePassOutParamRules } from './passOutParams';

type validKeys = typeof recipeKeys[number];
type alchemizeParam = Parameters<typeof alchemize>[0];

const validator: Partial<Record<validKeys, (params: any) => void>> = {
  passOutParamRules: validatePassOutParamRules,
};

function recipe<T>(params: Recipe): { alchemize: typeof alchemize } {
  if (params === null || typeof params !== 'object') {
    throw new AlchemistError('E001');
  }

  for (const [key, value] of Object.entries(params)) {
    if (!recipeKeys.includes(key as validKeys)) {
      throw new AlchemistError('E002', key);
    }

    if (validator[key as validKeys]) {
      if (validator[key as validKeys]) {
        validator[key as validKeys]!(value);
      }
    }
  }

  return {
    alchemize: alchemize.bind(
      null,
      { ...params, [recipeIdentity]: true } as unknown as alchemizeParam
    ) as typeof alchemize
  };
}

export { recipe };
