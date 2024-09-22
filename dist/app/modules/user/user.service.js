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
exports.userService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prismaClient_1 = __importDefault(require("../../../shared/prismaClient"));
const fileUploader_1 = require("../../../helpers/fileUploader");
const meilisearch_1 = __importDefault(require("../../../shared/meilisearch"));
const s3Uploader_1 = __importDefault(require("../../../helpers/s3Uploader"));
const meiliDoctorIndex = meilisearch_1.default.index('doctors');
const meiliAuthorIndex = meilisearch_1.default.index('authors');
const createAdmin = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const uploadedFileUrl = yield (0, s3Uploader_1.default)(req.file);
        // const uploadedFile = await fileUploader.saveToCloudinary(req.file);
        // req.body.admin.profilePhoto = uploadedFile?.secure_url;
        req.body.admin.profilePhoto = uploadedFileUrl;
    }
    const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: client_1.UserRole.ADMIN,
    };
    const result = yield prismaClient_1.default.$transaction((txClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield txClient.user.create({
            data: userData,
        });
        const newAdmin = yield txClient.admin.create({
            data: req.body.admin,
        });
        const { id, name, email, profilePhoto } = newAdmin;
        // await meiliDoctorIndex.addDocuments([{ id, name, email, profilePhoto }]);
        return newAdmin;
    }));
    return result;
});
const createAuthor = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const uploadedFile = yield fileUploader_1.fileUploader.saveToCloudinary(req.file);
        req.body.author.profilePhoto = uploadedFile === null || uploadedFile === void 0 ? void 0 : uploadedFile.secure_url;
    }
    const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
    const userData = {
        email: req.body.author.email,
        password: hashedPassword,
        role: client_1.UserRole.AUTHOR,
    };
    const result = yield prismaClient_1.default.$transaction((txClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield txClient.user.create({
            data: userData,
        });
        const newAuthor = yield txClient.author.create({
            data: req.body.author,
        });
        const { id, name, email, profilePhoto, contactNumber } = newAuthor;
        yield meiliAuthorIndex.addDocuments([
            { id, name, email, profilePhoto, contactNumber },
        ]);
        return newAuthor;
    }));
    return result;
});
exports.userService = {
    createAdmin,
    createAuthor,
};
