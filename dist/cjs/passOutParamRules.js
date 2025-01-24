"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passOutSlices = passOutSlices;
exports.validatePassOutParamRules = validatePassOutParamRules;
const errors_1 = require("./errors");
function passOutSlices(inputArray, numOfClasses, passOutParamRules) {
    /**
     * Splits an array of parameters according to the specified rules.
     *
     * @param inputArray The input array.
     * @param numOfClasses Expected number of result arrays.
     * @param passOutParamRules Optional array of rules.
     * @return An array of arrays after splitting.
     */
    // Special case: if passOutParamRules is missing or empty,
    // return numOfClasses arrays with the inputArray
    if (!passOutParamRules || passOutParamRules.length === 0) {
        return Array(numOfClasses).fill([...inputArray]);
    }
    const result = new Array(passOutParamRules.length).fill(null);
    let remainder = [...inputArray];
    // Process numeric rules first
    let spreadIndex = -1;
    passOutParamRules.forEach((rule, index) => {
        if (rule === '...') {
            spreadIndex = index;
        }
        else {
            if (typeof rule === 'number') {
                if (rule === 0) {
                    // Special case: rule is 0, result for this index is an empty array
                    result[index] = [];
                }
                else if (rule > 0) { // Take n elements from the start
                    if (remainder.length < rule) {
                        throw new errors_1.AlchemistError('E100', index, rule);
                    }
                    result[index] = remainder.slice(0, rule);
                    remainder = remainder.slice(rule);
                }
                else if (rule < 0) { // Take n elements from the end
                    if (remainder.length < Math.abs(rule)) {
                        throw new errors_1.AlchemistError('E100', index, rule);
                    }
                    result[index] = remainder.slice(rule);
                    remainder = remainder.slice(0, rule);
                }
            }
        }
    });
    // Then process the '...' rule if it exists
    if (spreadIndex !== -1) {
        result[spreadIndex] = remainder;
    }
    // Ensure all rules were applied correctly
    if (remainder.length > 0 && spreadIndex === -1) {
        throw new errors_1.AlchemistError('E101');
    }
    // Ensure the result length matches numOfClasses
    if (result.filter(segment => segment !== null).length !== numOfClasses) {
        throw new errors_1.AlchemistError('E102', numOfClasses);
    }
    return result.map(segment => segment || []);
}
function validatePassOutParamRules(passOutParamRules) {
    /**
     * Validates the rules array.
     *
     * @param passOutParamRules Array of rules to validate.
     * @throws Error if rules are invalid.
     */
    if (!Array.isArray(passOutParamRules)) {
        throw new errors_1.AlchemistError('E010');
    }
    if (passOutParamRules.filter(rule => rule === '...').length > 1) {
        throw new errors_1.AlchemistError('E011');
    }
    passOutParamRules.forEach((rule, index) => {
        if (rule !== '...' && (typeof rule !== 'number' || !Number.isInteger(rule))) {
            throw new errors_1.AlchemistError('E012', index, rule);
        }
    });
}
//# sourceMappingURL=passOutParamRules.js.map