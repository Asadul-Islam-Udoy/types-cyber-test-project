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
Object.defineProperty(exports, "__esModule", { value: true });
const GetUserToken = (user, res, statusCode) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield user.CreateUserToken();
    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'invalid user token'
        });
    }
    const option = {
        maxAge: 3600000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true for production (HTTPS)
    };
    res.status(statusCode).cookie('token', token, option).json({
        success: true,
        message: 'user get successfully!',
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        },
        token
    });
});
exports.default = GetUserToken;
