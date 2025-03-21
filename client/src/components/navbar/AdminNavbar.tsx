import AddAlertIcon from "@mui/icons-material/AddAlert";
import SearchIcon from '@mui/icons-material/Search';
function AdminNavbar() {
  return (
    <div className="bg-white flex justify-between py-2 shadow-lg">
      <div className="ml-9">
        <img
          alt="nusaiba-construction"
          loading="lazy"
          decoding="async"
          data-nimg="1"
          src="/cybercraft-logo.png"
          className="md:w-[150px] w-[150px]"
        />
      </div>
      <div className="flex justify-center items-center gap-6 mr-6">
        <div>
          <div className="relative flex w-full">
            <input
              type="text"
              placeholder="Search"
              className="py-2 md:w-[500px] bg-gray-200 focus:outline-none pl-2 rounded-lg"
            />
            <div className="absolute right-3 cursor-pointer text-gray-400   mt-2">
              <SearchIcon />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-[#88a3d2] mt-2">
            <AddAlertIcon />
          </div>
          <span className=" text-gray-600 font-bold">
            Asadul Islam
            <br />
            <span className="font-normal">Admin</span>
          </span>
          <img className="w-[30px] h-[30px] rounded-full" src="/29937.jpg" />
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
