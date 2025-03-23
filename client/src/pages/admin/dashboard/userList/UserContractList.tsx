import AdminNavbar from "../../../../components/navbar/AdminNavbar";
import AdminSidebar from "../../../../components/sidbar/AdminSidebar";
import DownloadIcon from "@mui/icons-material/Download";
import LoopIcon from '@mui/icons-material/Loop';
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import UserContractTable from "../../../../components/dashboard/UserContractTable";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import HostUrls from "../../../host/HostUrls";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
function UserContractList() {
  const navigate = useNavigate();
  const [loading,setLodding] = useState<boolean>(false);
  const logoutHandler=async()=>{
   setLodding(true);
   const config = {method:'GET',headers:{'Content-Type':'application/json'}}
   const response = await fetch(HostUrls+'/api/users/logout/',config);
   const data = await response.json()
   if(!response.ok){
    toast.error(data.message);
    setLodding(false)
   }
   else{
    toast.success('logout successfully!');
    localStorage.removeItem('auth');
    setLodding(false)
    navigate('/logout');
   }

  }

    const contentRef = useRef<HTMLDivElement>(null);
    const generatePDF = async () => {
      if (!contentRef.current) return;
  
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("contract-document.pdf");
    };
  
  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="bg-gray-200  w-[80%] flex flex-col  items-center gap-4 ml-[20%] min-h-screen">
        <div className="flex w-[90%] mt-4 justify-between">
          <h3 className=" font-bold text-gray-600  text-[25px]">Users Contract Pages</h3>
          <div className="mr-5 flex gap-7">
            <div onClick={generatePDF} title="download pdf file" className="border border-2 cursor-pointer rounded-sm text-[#88a3d2] flex justify-center items-center border-[#88a3d2] w-10 h-10">
              <DownloadIcon />
            </div>
            <div title="add contract" className="border border-2 cursor-pointer rounded-sm text-[#88a3d2] flex justify-center items-center border-[#88a3d2] w-10 h-10">
              <AddIcon />
            </div>
            <div onClick={logoutHandler} title="logout" className="border border-2 cursor-pointer rounded-sm text-[#88a3d2] flex justify-center items-center border-[#88a3d2] w-10 h-10">
              <LogoutIcon/>{loading && '...'}
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
          <div ref={contentRef} className="m-3">
            <UserContractTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserContractList;
