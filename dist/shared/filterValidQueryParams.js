"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterValidQueryParams = void 0;
const filterValidQueryParams = (params, validParams) => {
    const filteredParams = {};
    for (const key of validParams) {
        if (Object.hasOwnProperty.call(params, key) && params[key]) {
            filteredParams[key] = params[key];
        }
    }
    return filteredParams;
};
exports.filterValidQueryParams = filterValidQueryParams;
