import { NextFunction,Request,Response } from "express";

 const GlobalErrorHanler = (err:Error,req:Request,res:Response,next:NextFunction):any=>{
    try{
      if(res.headersSent){
        next({
            success:false,
            message:err.message
        })
      } 
      else{
        if(err.message){
          return res.status(400).json({
            success:false,
            message:err.message
          })  
        }
        else{
            return res.status(400).json({
                success:false,
                message:'somthing is wrong'
              })   
        }
      }
    }
    catch(error:any){
        res.status(500).json({
            success:false,
            message:'server error'+error
        })
    }
}

export default GlobalErrorHanler;