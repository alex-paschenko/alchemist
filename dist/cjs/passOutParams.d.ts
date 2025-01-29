import { PassOutParamRule } from './interfaces';
declare function passOutSlices<T>(inputArray: T[], numOfClasses: number, passOutParamRules?: PassOutParamRule[]): T[][];
declare function validatePassOutParamRules(passOutParamRules: PassOutParamRule[]): void;
export { passOutSlices, validatePassOutParamRules };
