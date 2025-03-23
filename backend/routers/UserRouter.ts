import  express from "express";
import passport from "passport";
import dotenv from 'dotenv';
import UserModel from '../models/UserModel'
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GetUserMessagesController, UserContractController, UserCreateController, UserLoginController, UserLogoutController } from "../controllers/UserController";
import GetUserToken from "../tokens/GetUserToken";
import path from 'path';
import multer from 'multer';
import shortid from 'shortid'
import { isUserController } from "../middleware/UserMiddleware";
dotenv.config({path:'.env'});
const router = express.Router();


router.post('/create',UserCreateController);
router.post('/login',UserLoginController);
router.get('/logout',UserLogoutController);

// Set up multer storage options
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'../public/images/files/'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
const upload = multer({ storage: storage })
///create message
router.post('/contract',isUserController,upload.none(),UserContractController);
///get message
router.get('/get/messages',GetUserMessagesController)

////google authorization  
passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || "your-default-client-id", // google client id
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "your-default-client-secret", // google client secret
        // the callback url added while creating the Google auth app on the console
        callbackURL: process.env.NODE_ENV === "production"
        ? "https://task-cb-test.onrender.com/api/users/auth/google/redirect"
        : "http://localhost:5000/api/users/auth/google/redirect",
      },
      async function (accessToken, refreshToken, profile,done) {
        const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;
        const user = await UserModel.findOne({ email: email || profile.id });
        if (user) {
          return done(null,user);
        }
        const create_user = await UserModel.create({ email: email || profile.id });
        if (!create_user) {
            return done(new Error("User creation failed"), false);
        }
        return done(null, create_user);
      }
    )
  );
  
  // function to serialize a user/profile object into the session
  passport.serializeUser(function (user:any, done) {
    done(null, user._id);
  });
  
  // function to deserialize a user/profile object into the session
  passport.deserializeUser(async (id, done) =>{
    try {
        const user = await UserModel.findById(id);
        if (!user) {
          return done(new Error("User not found"), false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
  });
  
  // authetication route
  router.get(
    "/google",
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })
    
  );
  
  // Call back route
  router.get(
    "/auth/google/redirect",
    passport.authenticate("google", { failureRedirect: "http://localhost:3001/login" }),
    async(req, res):Promise<any> => {
      if (!req.user) {
        res.status(400).json({ error: "Authentication failed" });
      }
      // return user details
      const user:any = req.user;
      return await GetUserToken(user, res, 200);
    }
  
  );
  

export default router;