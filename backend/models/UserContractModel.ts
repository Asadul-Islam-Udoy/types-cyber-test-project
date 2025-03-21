import mongoose ,{Document, Schema}from "mongoose";

interface UserCon extends Document{
    user:Schema.Types.ObjectId,
    message:string
}

const UserContractSchema = new mongoose.Schema<UserCon>({
     user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true,'user must be required!']
     },
     message:{
        type:String,
        required:[true,'message must be required!']
     }
},{timestamps:true});

const model = mongoose.model<UserCon>('UserContract',UserContractSchema);

export default model;