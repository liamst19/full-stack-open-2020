"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = exports.isString = exports.assertNever = void 0;
/**
 * Helper function for exhaustive type checking
 */
exports.assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
exports.isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
exports.isDate = (date) => {
    return Boolean(Date.parse(date));
};
