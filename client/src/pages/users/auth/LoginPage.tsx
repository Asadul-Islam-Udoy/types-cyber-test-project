import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import HostUrls from "../../host/HostUrls";
import { useAuth } from "../../../context/UserContext";
function LoginPage() {
  const [auth] = useAuth();
  interface User{
    email:string,
    password:string,
  }
  const navigate = useNavigate();
  const[showPassword,setShowPassword] = useState<boolean>(false);
  const[lodding,setLodding] = useState<boolean>(false);
  const[user,setUser] = useState<User>({
    email:'',
    password:'',
  });

  const SumbitHanler = async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
     setLodding(true);
     const config = { method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(user)}
     const response =  await fetch(HostUrls+'/api/users/login',config);
     const data = await response.json();
     if(!response.ok){
      toast.error(data.message);
      setLodding(false)
     }
     else{
     localStorage.setItem('auth',JSON.stringify(data));
     setLodding(false);
     if(auth?.user?.role == 'admin'){
      navigate('/dashboard/users/contract');
     }
     else{
      navigate('/');
     }
     }
    }
    catch(error:any){
      console.log(error);
      //toast.error(error.response.data.message)
    }
    finally{
      setLodding(false)
    }
  }
  return (
    <form onSubmit={SumbitHanler}>
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
              <input type="email" required value={user.email} onChange={(e)=>setUser((pre)=>({...pre,email:e.target.value}))} className="py-3 focus:outline-none pl-2 rounded-lg" />
            </div>
            <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
              <label className="text-gray-600">Password</label>
              <div className="relative flex w-full">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={user.password} onChange={(e)=>setUser((pre)=>({...pre,password:e.target.value}))}
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
              <button type="submit" className=" bg-[#184086] py-2 text-white rounded-lg">
                {lodding?'Login...':'Login'}
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
