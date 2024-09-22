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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../../config/config"));
const emailSender = (receiverEmail, html) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: config_1.default.sender_email,
            pass: config_1.default.app_password,
        },
    });
    // async..await is not allowed in global scope, must use a wrapper
    // send mail with defined transport object
    const info = yield transporter.sendMail({
        from: '"Prisma Blog" <mizanmahi24@gmail.com>', // sender address
        to: receiverEmail, // list of receivers
        subject: 'Reset Password Link', // Subject line
        //   text: 'Hello world?', // plain text body
        html, // html body
    });
    console.log('Message sent: %s', info.messageId);
});
exports.default = emailSender;
