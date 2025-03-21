import { UserId } from "../models/UserModel";

const GetUserToken=(user:UserId,res:any,statusCode:number)=>{
   const token = user.CreateUserToken();
   if(!token){
    return res.status(400).json({
        success:false,
        message:'invalid user token'
    })
   }
   const option ={
    expires:new Date(Date.now() + 60*60*1000*24),
    httpOnly:false,
    sameSite:'Strict'
   }

   res.status(statusCode).cookie('token',option).json({
    success:true,
    message:'user get successfully!',
    user:{
        username:user.username,
        email:user.email
    },
    token
   })
}

export default GetUserToken;