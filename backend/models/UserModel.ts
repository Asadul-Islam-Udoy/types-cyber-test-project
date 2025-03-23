import mongoose,{Document} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export interface UserId extends Document{
    username:string,
    email:string,
    password:string,
    role:string,
    ComparePassword(password:string):Promise<boolean>,
    CreateUserToken():Promise<string>
}

const UserSchema = new mongoose.Schema<UserId>({
    username:{
        type:String,
        required:[true,'username is required!'],
        maxlength:[30,'maximum length 30 characters'],
        minlength:[5,'minimum length 5 characters'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'email is required!'],
        unique:[true,'email must be unique!'],
    },
    password:{
        type:String,
        required:[true,'password is required!'],
        select:false
    },
    role:{
        type:String,
        default:'user'
    }
},{timestamps:true});

UserSchema.pre('save', async function(next){
   const user = this as UserId;
   if(!user.isModified('password')) return next();
   const solt = await bcrypt.genSalt(10)
   user.password = await bcrypt.hash(user.password,solt);
   next();
});

UserSchema.methods.ComparePassword=async function (password:string):Promise<boolean> {
    return await bcrypt.compare(password,this.password);
};

UserSchema.methods.CreateUserToken=async function ():Promise<string> {
    return await jwt.sign({_id:this._id},process.env.SCRET_KEY!,{expiresIn:'1d'});
}

const model = mongoose.model<UserId>('User',UserSchema);

export default model;