"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("../../../shared/prismaClient"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const admin_constants_1 = require("./admin.constants");
const getAllAdminFomDB = (queryParams, paginationAndSortingQueryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = queryParams, otherQueryParams = __rest(queryParams, ["q"]);
    const { limit, skip, page, sortBy, sortOrder } = (0, paginationHelpers_1.generatePaginateAndSortOptions)(Object.assign({}, paginationAndSortingQueryParams));
    const conditions = [];
    // filtering out the soft deleted users
    conditions.push({
        isDeleted: false,
    });
    //@ searching
    if (q) {
        const searchConditions = admin_constants_1.searchableFields.map((field) => ({
            [field]: { contains: q, mode: 'insensitive' },
        }));
        conditions.push({ OR: searchConditions });
    }
    //@ filtering with exact value
    if (Object.keys(otherQueryParams).length > 0) {
        const filterData = Object.keys(otherQueryParams).map((key) => ({
            [key]: otherQueryParams[key],
        }));
        conditions.push(...filterData);
    }
    const result = yield prismaClient_1.default.admin.findMany({
        where: { AND: conditions },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prismaClient_1.default.admin.count({
        where: { AND: conditions },
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        result,
    };
});
const getSingleAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
});
const updateAdminIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    return yield prismaClient_1.default.admin.update({
        where: {
            id,
        },
        data,
    });
});
const deleteAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    return yield prismaClient_1.default.$transaction((trClient) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedAdmin = yield trClient.admin.delete({
            where: {
                id,
            },
        });
        yield trClient.user.delete({
            where: {
                email: deletedAdmin.email,
            },
        });
        return deletedAdmin;
    }));
});
const softDeleteAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    return yield prismaClient_1.default.$transaction((trClient) => __awaiter(void 0, void 0, void 0, function* () {
        const adminDeletedData = yield trClient.admin.update({
            where: {
                id,
            },
            data: {
                isDeleted: true,
            },
        });
        yield trClient.user.update({
            where: {
                email: adminDeletedData.email,
            },
            data: {
                status: client_1.UserStatus.DELETED,
            },
        });
        return adminDeletedData;
    }));
});
exports.AdminService = {
    getAllAdminFomDB,
    getSingleAdminFromDB,
    updateAdminIntoDB,
    deleteAdminFromDB,
    softDeleteAdminFromDB,
};
