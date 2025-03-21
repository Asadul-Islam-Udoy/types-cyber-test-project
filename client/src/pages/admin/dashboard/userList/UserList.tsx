import AdminNavbar from "../../../../components/navbar/AdminNavbar";
import AdminSidebar from "../../../../components/sidbar/AdminSidebar";
import DownloadIcon from "@mui/icons-material/Download";
import LoopIcon from '@mui/icons-material/Loop';
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
function UserList() {
  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="bg-gray-200  w-[80%] flex flex-col  items-center gap-4 ml-[20%] min-h-screen">
        <div className="flex w-[90%] mt-4 justify-between">
          <h3 className="ml-5 font-bold text-gray-600 text-[25px]">Employes</h3>
          <div className="mr-5 flex gap-7">
            <div className="border border-2 rounded-sm text-[#88a3d2] flex justify-center items-center border-[#88a3d2] w-10 h-10">
              <DownloadIcon />
            </div>
            <div className="border border-2 rounded-sm text-[#88a3d2] flex justify-center items-center border-[#88a3d2] w-10 h-10">
              <AddIcon />
            </div>
          </div>
        </div>
        <div className="bg-white w-[90%] min-h-[650px]">
          <div className="flex mt-7 ">
            <div className="relative flex mt-2 mr-3 justify-end w-full">
              <input
                type="text"
                placeholder="Search"
                className="py-2 md:w-[300px] border border-2 focus:outline-none pl-2 rounded-lg"
              />
              <div className="absolute right-3 cursor-pointer text-gray-400   mt-2">
                <SearchIcon />
              </div>
            </div>
            <div className="border rounded-sm border-2 text-[#88a3d2] flex justify-center items-center border-[#88a3d2] w-10 h-10 mt-2 mr-3">
              <LoopIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
