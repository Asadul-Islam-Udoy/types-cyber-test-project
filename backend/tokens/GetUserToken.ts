import { UserId } from "../models/UserModel";

const GetUserToken= async(user:UserId,res:any,statusCode:number)=>{
   const token = await user.CreateUserToken();
   if(!token){
    return res.status(400).json({
        success:false,
        message:'invalid user token'
    })
   }
   const option ={
    maxAge: 3600000, 
    httpOnly:true,
    secure: process.env.NODE_ENV === 'production', // Set to true for production (HTTPS)
   }
   res.status(statusCode).cookie('token',token,option).json({
    success:true,
    message:'user get successfully!',
    user:{
        _id:user._id,
        username:user.username,
        email:user.email,
        role:user.role
    },
    token
   })
}

export default GetUserToken;