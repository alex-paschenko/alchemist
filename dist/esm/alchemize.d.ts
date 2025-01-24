import { Constructor, MergeClasses } from './interfaces';
declare function alchemize<TBaseClasses extends Constructor[]>(...args: TBaseClasses): MergeClasses<TBaseClasses>;
export { alchemize };
