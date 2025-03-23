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
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, 'username is required!'],
        maxlength: [30, 'maximum length 30 characters'],
        minlength: [5, 'minimum length 5 characters'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required!'],
        unique: [true, 'email must be unique!'],
    },
    password: {
        type: String,
        required: [true, 'password is required!'],
        select: false
    },
    role: {
        type: String,
        default: 'user'
    }
}, { timestamps: true });
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password'))
            return next();
        const solt = yield bcrypt_1.default.genSalt(10);
        user.password = yield bcrypt_1.default.hash(user.password, solt);
        next();
    });
});
UserSchema.methods.ComparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
UserSchema.methods.CreateUserToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return yield jsonwebtoken_1.default.sign({ _id: this._id }, process.env.SCRET_KEY, { expiresIn: '1d' });
    });
};
const model = mongoose_1.default.model('User', UserSchema);
exports.default = model;
