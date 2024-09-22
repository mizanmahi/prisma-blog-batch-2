"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const fileUploader_1 = require("../../../helpers/fileUploader");
const user_validationSchema_1 = require("./user.validationSchema");
const router = express_1.default.Router();
router.post('/create-admin', 
// authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
fileUploader_1.fileUploader.upload.single('file'), (req, res, next) => {
    req.body = user_validationSchema_1.userValidationSchema.createAdminSchema.parse(JSON.parse(req.body.data));
    return user_controller_1.userController.createAdmin(req, res, next);
});
router.post('/create-author', fileUploader_1.fileUploader.upload.single('file'), (req, res, next) => {
    req.body = user_validationSchema_1.userValidationSchema.createAuthorSchema.parse(JSON.parse(req.body.data));
    return user_controller_1.userController.createAuthor(req, res, next);
});
exports.userRoutes = router;
