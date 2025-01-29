import { recipeIdentity } from "./constants";
export type PassOutParamRule = number | '...';
export interface Recipe {
    passOutParamRules?: PassOutParamRule[];
    instanceOfSupport?: boolean;
}
export interface RecipeWithIdentity extends Recipe {
    [recipeIdentity]: boolean;
}
export declare const recipeKeys: readonly ["passOutParamRules", "instanceOfSupport"];
export type Constructor<T = {}> = new (...args: any[]) => T;
export type MergeInstance<TBaseClasses extends Constructor[]> = TBaseClasses extends [
    infer First extends Constructor,
    ...infer Rest extends Constructor[]
] ? InstanceType<First> & MergeInstance<Rest> : unknown;
export type MergeStatics<TBaseClasses extends Constructor[]> = TBaseClasses extends [
    infer First extends Constructor,
    ...infer Rest extends Constructor[]
] ? First & MergeStatics<Rest> : unknown;
export type MergeClasses<TBaseClasses extends Constructor[]> = Constructor<MergeInstance<TBaseClasses>> & MergeStatics<TBaseClasses>;
