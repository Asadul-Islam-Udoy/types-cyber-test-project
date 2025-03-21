import {  useNavigate } from "react-router-dom";
function LogoutPage() {
  const navigate = useNavigate()
  return (
      <div className="w-full h-screen  bg-gray-200 flex justify-center items-center">
        <div className="p-10  md:h-auto bg-white shadow-lg gap-4 flex items-center justify-around ">
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
               Thank you so much for your nice contribution for tody
              </p>
            </div>
            <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
            <button onClick={()=>[navigate('/login')]} className=" bg-[#184086] py-2 text-white rounded-lg">
              Go back to login
            </button>
          </div>
          </div>
        </div>
      </div>
  );
}

export default LogoutPage;
