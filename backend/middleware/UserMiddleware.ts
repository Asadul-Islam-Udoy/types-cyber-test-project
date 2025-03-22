import { Request,NextFunction ,Response} from "express";
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import { AsyncErrorHanler } from "../errors/AsyncErrorHandlers";

export const isUserController=AsyncErrorHanler(async(req:any,res:Response,next:NextFunction):Promise<any>=>{
   const {token} = req.cookies;
   if(!token){
    return res.status(400).json({
        success:false,
        message:'user token is not define!'
    })
   }
   const deCode:any = await jwt.verify(token,process.env.SCRET_KEY!);
   req.user = await UserModel.findById(deCode._id);
   next()
})
