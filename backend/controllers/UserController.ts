import { AsyncErrorHanler } from "../errors/AsyncErrorHandlers";
import { Request, Response } from "express";
import User from "../models/UserModel";
import GetUserToken from "../tokens/GetUserToken";

/// new user create
export const UserCreateController = AsyncErrorHanler(
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { username, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          success: false,
          message: "user all ready exist!",
        });
      }
      await User.create({
        username,
        email,
        password,
      });

      return res.status(200).json({
        success: true,
        message: "user create successfully!",
      });
    } catch (error:any) {
      if (error.name === 'ValidationError') {
        console.log(error.errors)
        const errors = Object.values(error.errors).map((err: any) => ({path:err.path, message:err.message}));
        return res.status(400).json({
          success: false,
          message: errors,
          // Array of validation error messages
        });
      }
      else{
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }
  }
);


///user login controller
export const UserLoginController = AsyncErrorHanler(
  async (req: Request, res: Response): Promise<any> => {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "user is not exist!",
        });
      }
      const match = await user.ComparePassword(password);
      if (!match) {
        return res.status(400).json({
          success: false,
          message: "incorrent password!",
        });
      }
      
      await GetUserToken(user,res,200);
    
  }
);


///user logout controller
export const UserLogoutController = AsyncErrorHanler(
  async (req: Request, res: Response): Promise<any> => {   
    res.clearCookie('token',{
      httpOnly:false
    });
    return res.status(200).json({
      success: true,
      message: "logout successfully!",
    });
  }
);