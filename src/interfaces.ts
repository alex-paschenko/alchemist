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

// Utility type to exclude private fields (should not be required in extended classes)
type PrivateFields<T> = {
  [K in keyof T]: K extends `_${string}` ? K : never;
}[keyof T];

// Merge instance properties (gives priority to the first class), supports arrays, and excludes private fields
export type MergeInstance<TBaseClasses extends Constructor[]> = TBaseClasses extends [
  infer First extends Constructor,
  ...infer Rest extends Constructor[]
]
  ? Omit<InstanceType<First>, keyof MergeInstance<Rest> | PrivateFields<InstanceType<First>>> &
      MergeInstance<Rest> &
      (InstanceType<First> extends Array<any> ? { [n: number]: any } : {}) // Support for array-like instances
  : unknown;

// Merge static properties (removes `prototype` to avoid conflicts with private fields)
export type MergeStatics<TBaseClasses extends Constructor[]> = TBaseClasses extends [
  infer First extends Constructor,
  ...infer Rest extends Constructor[]
]
  ? Omit<First, keyof MergeStatics<Rest> | "prototype"> & MergeStatics<Rest>
  : unknown;

// Final merged class type combining instance and static properties
export type MergeClasses<TBaseClasses extends Constructor[]> = Constructor<
  MergeInstance<TBaseClasses>
> &
  MergeStatics<TBaseClasses>;