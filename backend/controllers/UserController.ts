import { AsyncErrorHanler } from "../errors/AsyncErrorHandlers";
import { Request,Response } from "express";
import User from '../models/UserModel';

/// new user create
export const UserCreateController=AsyncErrorHanler(async(req:Request,res:Response):Promise<any>=>{
  const {username,email,password} = req.body;
  const user = await User.findOne({email});
  if(user){
    return res.status(400).json({
        success:false,
        message:'user all ready exist!'
    })
  }
 await User.create({
    username,email,password
 });

 return res.status(200).json({
    success:true,
    message:'user create successfully!'
});

})