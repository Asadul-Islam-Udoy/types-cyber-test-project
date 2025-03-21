import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
function RegisterPage() {
  const[showPassword,setShowPassword] = useState(false)
  return (
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
            <input className="py-3 focus:outline-none pl-2 rounded-lg" />
          </div>
          <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
            <label className="text-gray-600">Email Address</label>
            <input className="py-3 focus:outline-none pl-2 rounded-lg" />
          </div>
          <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
            <label className="text-gray-600">Password</label>
            <div className="relative flex w-full">
              <input type={showPassword?'text':'password'} className="py-3 w-full focus:outline-none pl-2 rounded-lg" />
              <div onClick={()=>setShowPassword((pre)=>!pre)} className="absolute right-3 cursor-pointer text-gray-400   mt-2">
              {showPassword ? <VisibilityIcon  /> :<VisibilityOffIcon/>}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
            <label className="text-gray-600">Confirm Password</label>
            <div className="relative flex w-full">
              <input type={showPassword?'text':'password'} className="py-3 w-full focus:outline-none pl-2 rounded-lg" />
              <div onClick={()=>setShowPassword((pre)=>!pre)} className="absolute right-3 cursor-pointer text-gray-400   mt-2">
                 {showPassword ? <VisibilityIcon  /> :<VisibilityOffIcon/>}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
            <button className=" bg-[#184086] py-2 text-white rounded-lg">
              Sign Up
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
  );
}

export default RegisterPage;
