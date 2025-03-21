import  express from "express";
import { UserCreateController, UserLoginController, UserLogoutController } from "../controllers/UserController";
const router = express.Router();


router.post('/create',UserCreateController);
router.post('/login',UserLoginController);
router.get('/logout',UserLogoutController);

export default router;