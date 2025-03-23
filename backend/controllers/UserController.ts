import { AsyncErrorHanler } from "../errors/AsyncErrorHandlers";
import { Request, Response } from "express";
import pdfkit from 'pdfkit';
import fs from 'fs';
import User from "../models/UserModel";
import GetUserToken from "../tokens/GetUserToken";
import UserContractModel from '../models/UserContractModel';
import { sendEmail } from "../helpers/SendEmail";

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

///user contract controller
export const UserContractController=AsyncErrorHanler(async(req:Request,res:Response):Promise<any>=>{
  const {name,email,message} = req.body;
    const doc = new pdfkit();
    const pdfPath = `public/images/files/form-data-${Date.now()}.pdf`;
    doc.pipe(fs.createWriteStream(pdfPath));
  
    doc.fontSize(25).text('Form Data PDF', { align: 'center' });
    doc.fontSize(18).text(`Full Name: ${name}`);
    doc.text(`Email Address: ${email}`);
    doc.text(`Message: ${message}`);
    
    doc.end();
   return await sendEmail(pdfPath,message,res,req)
    .then(() => {
      res.status(200).send({ message: 'PDF created and email sent' });
    })
    .catch((err) => {
      console.error('Error sending email:', err);
      res.status(500).send({ error: 'Error sending email' });
    });
    // Send email once the PDF is created

});


///get messages
export const GetUserMessagesController=AsyncErrorHanler(async(req:Request,res:Response):Promise<any>=>{
   const messages = await UserContractModel.find({}).populate('user',"username email role");
   return res.status(200).json({
    success:true,
    message:'user message get successfully!',
    messages
   })
})