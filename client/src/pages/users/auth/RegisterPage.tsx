import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {toast} from 'react-toastify';
import { useState } from "react";
import HostUrls from "../../host/HostUrls";
function RegisterPage() {
  interface User{
    username:string,
    email:string,
    password:string,
    confirmPassword:string
  }
  const navigate = useNavigate();
  const[showPassword,setShowPassword] = useState(false);
  const[lodding,setLodding] = useState(false);
  const[user,setUser] = useState<User>({
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  });

  const sumbitHanler=async(e:React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault();
   try{
    if(user?.password !== user?.confirmPassword){
       toast.warn('confirm password is not match!');
       return
    }
    setLodding(true);
    const info = JSON.stringify({
      username:user?.username,
      email:user?.email,
      password:user?.password
    })
    const config = {method:'POST',headers:{'Content-Type':'application/json'},body:info}
    const response = await fetch(HostUrls+'/api/users/create',config);
    const data = await response.json();

    if(!response.ok){
      toast.error(data?.message[0].path+':'+data?.message[0].message);
      setLodding(false)
    }
    else{
       toast.success(data?.message);
       navigate('/login');
       setLodding(false);
    }
   }
   catch(error:any){
    toast.error(error.message);
   }
   finally{
    setLodding(false);
   }

  }
  return (
    <form onSubmit={sumbitHanler}>
    <div className="w-full h-screen  bg-white flex justify-center items-center">
      <div className="w-[55%]  md:min-h-[68%] grid grid-cols-1 md:grid-cols-2 gap-4 flex items-center justify-around bg-gradient-to-r from-custom-blue shadow-lg rounded-sm via-custom-light-blue to-custom-lightest-blue">
        <div className="flex flex-col  items-center gap-4 justify-center">
          <div>
            <img
              alt="nusaiba-construction"
              loading="lazy"
              decoding="async"
              data-nimg="1"
              src="/cybercraft-logo.png"
              className="md:w-[300px] w-[150px]"
            />
          </div>
          <div className="w-[90%] item-center flex justify-center">
            <p className="w-full text-center text-gray-700 md:text-[20px]">
              Welcome back to CyberCraft Bangladesh, where your creativity
              thrives
            </p>
          </div>
        </div>
        <div className="flex flex-col py-6 gap-4 ">
          <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
            <label className="text-gray-600">Username</label>
            <input type="text" required value={user?.username} onChange={(e)=>setUser((pre)=>({...pre,username:e.target.value}))} className="py-3 focus:outline-none pl-2 rounded-lg" />
          </div>
          <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
            <label className="text-gray-600">Email Address</label>
            <input type="email" required value={user?.email} onChange={(e)=>setUser((pre)=>({...pre,email:e.target.value}))} className="py-3 focus:outline-none pl-2 rounded-lg" />
          </div>
          <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
            <label className="text-gray-600">Password</label>
            <div className="relative flex w-full">
              <input required value={user?.password} onChange={(e)=>setUser((pre)=>({...pre,password:e.target.value}))} type={showPassword?'text':'password'} className="py-3 w-full focus:outline-none pl-2 rounded-lg" />
              <div onClick={()=>setShowPassword((pre)=>!pre)} className="absolute right-3 cursor-pointer text-gray-400   mt-2">
              {showPassword ? <VisibilityIcon  /> :<VisibilityOffIcon/>}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
            <label className="text-gray-600">Confirm Password</label>
            <div className="relative flex w-full">
              <input required value={user?.confirmPassword} onChange={(e)=>setUser((pre)=>({...pre,confirmPassword:e.target.value}))} type={showPassword?'text':'password'} className="py-3 w-full focus:outline-none pl-2 rounded-lg" />
              <div onClick={()=>setShowPassword((pre)=>!pre)} className="absolute right-3 cursor-pointer text-gray-400   mt-2">
                 {showPassword ? <VisibilityIcon  /> :<VisibilityOffIcon/>}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
            <button type="submit" className=" bg-[#184086] py-2 text-white rounded-lg">
              {lodding ? 'Submitting...':'Sign Up'}
            </button>
          </div>
          <span className="md:w-[80%] w-[100%] justify-center flex">or</span>
          <p className="md:w-[80%] w-[100%] justify-center flex py-2">
            if you already sign up?{" "}
            <Link
              to="/login"
              className=" border-b border-b-blue-500 text-blue-500 italic ml-1"
            >
              Login In
            </Link>
          </p>
        </div>
      </div>
    </div>
    </form>
  );
}

export default RegisterPage;
