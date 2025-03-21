import ShareIcon from '@mui/icons-material/Share';
function Contract() {
  const style = {
    backgroundColor: "#88a3d2",
    clipPath: "polygon(43% 0, 100% 0, 100% 46%, 80% 100%, 25% 100%, 9% 100%)",
  };
  return (
    <div className="bg-gray-200 relative  w-full ">
      <div style={style} className=" w-full md:h-screen h-[1200px]"></div>
      <div className="w-[90%] md:mt-0  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black grid grid-cols-1 md:grid-cols-2 gap-4 flex items-center justify-around">
       <div>
        <div className="flex flex-col  gap-4 ">
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
          <div className="w-[70%] item-center flex justify-center">
            <p className="w-full text-center text-gray-700 md:text-[20px]">
              Welcome back to CyberCraft Bangladesh, where your creativity
              thrives
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4  ">
        <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
            <label className="text-gray-600">Full Name</label>
            <input className="py-3 focus:outline-none pl-2 rounded-lg" />
          </div>
          <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
            <label className="text-gray-600">Email</label>
            <input className="py-3 focus:outline-none pl-2 rounded-lg" />
          </div>
          <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
            <label className="text-gray-600">Message</label>
            <div className="relative flex w-full">
              <textarea
                className="py-7 w-full focus:outline-none pl-2 rounded-lg"
              />
              <div className="absolute right-3 cursor-pointer text-gray-400   mt-2"></div>
            </div>
          </div>
          <div className="flex flex-col md:w-[70%] w-[90%] ml-5 gap-1">
            <button className="bg-[#06214f] py-2 text-white rounded-lg">
              Submit
            </button>
          </div>
        </div>
        <div className="flex flex-col border  md:w-[70%] w-[90%] ml-5 mt-4 gap-1">
            <button className=" text-blue-600 py-2 rounded-lg">
              <ShareIcon/>Share
            </button>
          </div>
        </div>
        <div className="">{/* img */}
            <img className="md:w-[1000px]" src="/contract-logo.png"/>
        </div>
      </div>
    </div>
  );
}

export default Contract;
