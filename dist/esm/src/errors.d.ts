declare class AlchemistError extends Error {
    constructor(code: string, ...args: (string | number)[]);
    code: string;
}
export { AlchemistError };
