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
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const UserController_1 = require("../controllers/UserController");
const GetUserToken_1 = __importDefault(require("../tokens/GetUserToken"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const shortid_1 = __importDefault(require("shortid"));
const UserMiddleware_1 = require("../middleware/UserMiddleware");
dotenv_1.default.config({ path: '.env' });
const router = express_1.default.Router();
router.post('/create', UserController_1.UserCreateController);
router.post('/login', UserController_1.UserLoginController);
router.get('/logout', UserController_1.UserLogoutController);
// Set up multer storage options
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(path_1.default.dirname(__dirname), '../public/images/files/'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid_1.default.generate() + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
///create message
router.post('/contract', UserMiddleware_1.isUserController, upload.none(), UserController_1.UserContractController);
///get message
router.get('/get/messages', UserController_1.GetUserMessagesController);
////google authorization  
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "your-default-client-id", // google client id
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "your-default-client-secret", // google client secret
    // the callback url added while creating the Google auth app on the console
    callbackURL: process.env.NODE_ENV === "production"
        ? "https://task-cb-test.onrender.com/api/users/auth/google/redirect"
        : "http://localhost:5000/api/users/auth/google/redirect",
}, function (accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;
        const user = yield UserModel_1.default.findOne({ email: email || profile.id });
        if (user) {
            return done(null, user);
        }
        const create_user = yield UserModel_1.default.create({ email: email || profile.id });
        if (!create_user) {
            return done(new Error("User creation failed"), false);
        }
        return done(null, create_user);
    });
}));
// function to serialize a user/profile object into the session
passport_1.default.serializeUser(function (user, done) {
    done(null, user._id);
});
// function to deserialize a user/profile object into the session
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findById(id);
        if (!user) {
            return done(new Error("User not found"), false);
        }
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}));
// authetication route
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["email", "profile"],
}));
// Call back route
router.get("/auth/google/redirect", passport_1.default.authenticate("google", { failureRedirect: "http://localhost:3001/login" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(400).json({ error: "Authentication failed" });
    }
    // return user details
    const user = req.user;
    return yield (0, GetUserToken_1.default)(user, res, 200);
}));
exports.default = router;
