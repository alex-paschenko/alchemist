type Constructor<T = {}> = new (...args: any[]) => T;
type MergeInstance<TBaseClasses extends Constructor[]> = TBaseClasses extends [
    infer First extends Constructor,
    ...infer Rest extends Constructor[]
] ? InstanceType<First> & MergeInstance<Rest> : unknown;
type MergeStatics<TBaseClasses extends Constructor[]> = TBaseClasses extends [
    infer First extends Constructor,
    ...infer Rest extends Constructor[]
] ? First & MergeStatics<Rest> : unknown;
type MergeClasses<TBaseClasses extends Constructor[]> = Constructor<MergeInstance<TBaseClasses>> & MergeStatics<TBaseClasses>;
declare function alchemize<TBaseClasses extends Constructor[]>(...BaseClasses: TBaseClasses): MergeClasses<TBaseClasses>;
export { alchemize };
