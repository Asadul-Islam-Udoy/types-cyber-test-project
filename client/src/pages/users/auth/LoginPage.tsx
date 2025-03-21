import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form>
      <div className="w-full h-screen  bg-white flex justify-center items-center">
        <div className="w-[55%]  md:h-[68%] grid grid-cols-1 md:grid-cols-2 gap-4 flex items-center justify-around bg-gradient-to-r from-custom-blue shadow-lg rounded-sm via-custom-light-blue to-custom-lightest-blue">
          <div className="flex flex-col items-center gap-4 justify-center">
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
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
              <label className="text-gray-600">Email</label>
              <input className="py-3 focus:outline-none pl-2 rounded-lg" />
            </div>
            <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
              <label className="text-gray-600">Password</label>
              <div className="relative flex w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  className="py-3 w-full focus:outline-none pl-2 rounded-lg"
                />
                <div
                  onClick={() => setShowPassword((pre) => !pre)}
                  className="absolute right-3 cursor-pointer text-gray-400   mt-2"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </div>
              </div>
            </div>
            <div className="flex justify-between md:w-[70%] w-[90%] ml-5 gap-1">
              <div className="flex gap-1">
                <input className="w-4 " type="radio" />
                <p className="italic">Remember me</p>
              </div>
              <Link className=" text-blue-500" to="/forget-password">
                Forget Password?
              </Link>
            </div>
            <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
              <button className=" bg-[#184086] py-2 text-white rounded-lg">
                Login
              </button>
            </div>
            <span className="md:w-[80%] w-[100%] justify-center flex">or</span>
            <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
            <button className="px-4 py-2  flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Login with Google</span>
            </button>
            </div>
            <p className="md:w-[80%] w-[100%] justify-center flex py-2">
              Don't have an account?{" "}
              <Link
                to="/register"
                className=" border-b border-b-blue-500 text-blue-500 italic ml-1"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;
