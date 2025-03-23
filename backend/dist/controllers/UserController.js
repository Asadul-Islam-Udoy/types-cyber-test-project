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
exports.GetUserMessagesController = exports.UserContractController = exports.UserLogoutController = exports.UserLoginController = exports.UserCreateController = void 0;
const AsyncErrorHandlers_1 = require("../errors/AsyncErrorHandlers");
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const GetUserToken_1 = __importDefault(require("../tokens/GetUserToken"));
const UserContractModel_1 = __importDefault(require("../models/UserContractModel"));
const SendEmail_1 = require("../helpers/SendEmail");
/// new user create
exports.UserCreateController = (0, AsyncErrorHandlers_1.AsyncErrorHanler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const user = yield UserModel_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "user all ready exist!",
            });
        }
        yield UserModel_1.default.create({
            username,
            email,
            password,
        });
        return res.status(200).json({
            success: true,
            message: "user create successfully!",
        });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            console.log(error.errors);
            const errors = Object.values(error.errors).map((err) => ({ path: err.path, message: err.message }));
            return res.status(400).json({
                success: false,
                message: errors,
                // Array of validation error messages
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}));
///user login controller
exports.UserLoginController = (0, AsyncErrorHandlers_1.AsyncErrorHanler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield UserModel_1.default.findOne({ email }).select('+password');
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "user is not exist!",
        });
    }
    const match = yield user.ComparePassword(password);
    if (!match) {
        return res.status(400).json({
            success: false,
            message: "incorrent password!",
        });
    }
    yield (0, GetUserToken_1.default)(user, res, 200);
}));
///user logout controller
exports.UserLogoutController = (0, AsyncErrorHandlers_1.AsyncErrorHanler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('token', {
        httpOnly: false
    });
    return res.status(200).json({
        success: true,
        message: "logout successfully!",
    });
}));
///user contract controller
exports.UserContractController = (0, AsyncErrorHandlers_1.AsyncErrorHanler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message } = req.body;
    const doc = new pdfkit_1.default();
    const pdfPath = `public/images/files/form-data-${Date.now()}.pdf`;
    doc.pipe(fs_1.default.createWriteStream(pdfPath));
    doc.fontSize(25).text('Form Data PDF', { align: 'center' });
    doc.fontSize(18).text(`Full Name: ${name}`);
    doc.text(`Email Address: ${email}`);
    doc.text(`Message: ${message}`);
    doc.end();
    return yield (0, SendEmail_1.sendEmail)(pdfPath, message, res, req)
        .then(() => {
        res.status(200).send({ message: 'PDF created and email sent' });
    })
        .catch((err) => {
        console.error('Error sending email:', err);
        res.status(500).send({ error: 'Error sending email' });
    });
    // Send email once the PDF is created
}));
///get messages
exports.GetUserMessagesController = (0, AsyncErrorHandlers_1.AsyncErrorHanler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield UserContractModel_1.default.find({}).populate('user', "username email role");
    return res.status(200).json({
        success: true,
        message: 'user message get successfully!',
        messages
    });
}));
