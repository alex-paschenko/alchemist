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
type PrivateFields<T> = {
    [K in keyof T]: K extends `_${string}` ? K : never;
}[keyof T];
export type MergeInstance<TBaseClasses extends Constructor[]> = TBaseClasses extends [
    infer First extends Constructor,
    ...infer Rest extends Constructor[]
] ? Omit<InstanceType<First>, keyof MergeInstance<Rest> | PrivateFields<InstanceType<First>>> & MergeInstance<Rest> & (InstanceType<First> extends Array<any> ? {
    [n: number]: any;
} : {}) : unknown;
export type MergeStatics<TBaseClasses extends Constructor[]> = TBaseClasses extends [
    infer First extends Constructor,
    ...infer Rest extends Constructor[]
] ? Omit<First, keyof MergeStatics<Rest> | "prototype"> & MergeStatics<Rest> : unknown;
export type MergeClasses<TBaseClasses extends Constructor[]> = Constructor<MergeInstance<TBaseClasses>> & MergeStatics<TBaseClasses>;
export {};
