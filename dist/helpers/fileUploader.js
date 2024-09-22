"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../config/config"));
const storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, path_1.default.join(process.cwd(), '/uploads'));
    },
    filename: function (req, file, cb) {
        // Remove spaces, add a hyphen, and append a timestamp
        const sanitizedFilename = file.originalname.replace(/\s+/g, '-');
        const timestamp = Date.now();
        const filename = `${sanitizedFilename}-${timestamp}${path_1.default.extname(file.originalname)}`;
        cb(null, filename);
    },
});
// const upload = multer({ storage: multer.memoryStorage() });
const upload = (0, multer_1.default)({ storage });
cloudinary_1.v2.config({
    cloud_name: 'mizan-ph',
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
const saveToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(file.path, { public_id: file.originalname }, (error, result) => {
            fs_1.default.unlinkSync(file.path);
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.fileUploader = {
    upload,
    saveToCloudinary,
};
