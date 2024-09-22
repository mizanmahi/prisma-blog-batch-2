"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePaginateAndSortOptions = void 0;
const generatePaginateAndSortOptions = (paginateAndSortOptions) => {
    const page = Number(paginateAndSortOptions.page) || 1;
    const limit = Number(paginateAndSortOptions.limit) || 10;
    const skip = (Number(page) - 1) * limit;
    const sortBy = paginateAndSortOptions.sortBy || 'createdAt';
    const sortOrder = paginateAndSortOptions.sortOrder || 'desc';
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.generatePaginateAndSortOptions = generatePaginateAndSortOptions;
