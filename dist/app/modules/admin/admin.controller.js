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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const sendResponse_1 = require("../../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const admin_service_1 = require("./admin.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const filterValidQueryParams_1 = require("../../../shared/filterValidQueryParams");
const admin_constants_1 = require("./admin.constants");
const appConstants_1 = require("../../../shared/appConstants");
const getAllAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validQueryParams = (0, filterValidQueryParams_1.filterValidQueryParams)(req.query, admin_constants_1.validParams);
    const paginationAndSortingQueryParams = (0, filterValidQueryParams_1.filterValidQueryParams)(req.query, appConstants_1.paginationAndSortingParams);
    const result = yield admin_service_1.AdminService.getAllAdminFomDB(validQueryParams, paginationAndSortingQueryParams);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin data fetched!',
        meta: result.meta,
        data: result.result,
    });
}));
const getSingleAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.AdminService.getSingleAdminFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin data fetched successfully!',
        data: result,
    });
}));
const updateAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.AdminService.updateAdminIntoDB(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin data updated successfully!',
        data: result,
    });
}));
const deleteAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.AdminService.deleteAdminFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin data deleted successfully!',
        data: result,
    });
}));
const softDeleteAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.AdminService.softDeleteAdminFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin data deleted!',
        data: result,
    });
}));
exports.AdminController = {
    getAllAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin,
    softDeleteAdmin,
};
