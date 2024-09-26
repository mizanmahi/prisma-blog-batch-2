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
const client_s3_1 = require("@aws-sdk/client-s3");
const awsConfig_1 = __importDefault(require("../config/awsConfig"));
const config_1 = __importDefault(require("../config/config"));
const fs_1 = __importDefault(require("fs"));
const uploadImageS3 = (file) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(file);
    const fileBuffer = fs_1.default.readFileSync(file.path);
    // console.log(fileBuffer);
    // Upload file to S3
    const params = {
        Bucket: config_1.default.aws_bucket_name,
        Key: file.filename,
        Body: fileBuffer,
    };
    try {
        const result = yield awsConfig_1.default.send(new client_s3_1.PutObjectCommand(params));
        const uploadUrl = `https://${config_1.default.aws_bucket_name}.s3.${config_1.default.aws_region}.amazonaws.com/${file.filename}`;
        // console.log({ result, uploadUrl });
        return uploadUrl;
    }
    catch (err) {
        console.error(err);
    }
});
exports.default = uploadImageS3;
