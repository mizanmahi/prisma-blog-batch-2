"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const admin_ValidationSchema_1 = require("./admin.ValidationSchema");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get('/', (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), admin_controller_1.AdminController.getAllAdmin);
router.get('/:id', admin_controller_1.AdminController.getSingleAdmin);
router.patch('/:id', (0, validateRequest_1.validateRequest)(admin_ValidationSchema_1.adminValidationSchemas.update), admin_controller_1.AdminController.updateAdmin);
router.delete('/:id', admin_controller_1.AdminController.deleteAdmin);
router.delete('/soft/:id', admin_controller_1.AdminController.softDeleteAdmin);
exports.AdminRoutes = router;
