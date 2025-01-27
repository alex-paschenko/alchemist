import { recipeIdentity } from "./constants";

export type PassOutParamRule =  number | '...';

export interface Recipe {
  passOutParamRules?: PassOutParamRule[];
  instanceOfSupport?: boolean;
};

export interface RecipeWithIdentity extends Recipe {
  [recipeIdentity]: boolean;
}

export const recipeKeys = ['passOutParamRules', 'instanceOfSupport'] as const;

export type Constructor<T = {}> = new (...args: any[]) => T;

// Merge instance properties and methods
export type MergeInstance<TBaseClasses extends Constructor[]> = TBaseClasses extends [
  infer First extends Constructor,
  ...infer Rest extends Constructor[]
]
  ? InstanceType<First> & MergeInstance<Rest>
  : unknown;

// Merge static properties and methods
export type MergeStatics<TBaseClasses extends Constructor[]> = TBaseClasses extends [
  infer First extends Constructor,
  ...infer Rest extends Constructor[]
]
  ? First & MergeStatics<Rest>
  : unknown;

// Combined type including instance and static properties
export type MergeClasses<TBaseClasses extends Constructor[]> = Constructor<
  MergeInstance<TBaseClasses>
> &
  MergeStatics<TBaseClasses>;
