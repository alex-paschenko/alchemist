import { alchemize } from './alchemize';
import { Recipe } from './interfaces';
declare function recipe<T>(params: Recipe): {
    alchemize: typeof alchemize;
};
export { recipe };
