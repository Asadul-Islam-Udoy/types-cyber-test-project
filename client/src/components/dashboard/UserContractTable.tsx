import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "react-toastify";
import HostUrls from "../../pages/host/HostUrls";
import { Link } from "react-router-dom";
const downloadPDF = (pdf:string) => {
  window.open(HostUrls+`/images/files/${pdf}`, "_blank");
}
const columns: GridColDef[] = [
  { field: "sn", headerName: "SN", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  {
    field: "message",
    headerName: "Message",
    width: 290,
  },
  {
    field:'pdf',
    headerName:'PDF File',
    width:190
  },
  {
    field: "date_time",
    headerName: "Date-Time",
    width: 90,
  },
  {
    field: "action",
    headerName: "Action",
    width: 120,
    renderCell: (props) => {
      return (
        <>
          <div className="flex gap-4 ">
            <div onClick={()=>downloadPDF(props.row.pdf)} className=" text-[#88a3d2] cursor-pointer">
              <FileDownloadIcon />
            </div>
            <div onClick={()=>downloadPDF(props.row.pdf)} className="text-green-400 cursor-pointer ">
                 <VisibilityIcon />
            </div>
            <div className="text-red-500 cursor-pointer">
              <DeleteOutlineIcon />
            </div>
          </div>
        </>
      );
    },
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function UserContractTable() {

  interface UserMessageProps {
    user: string;
    message: string;
  }
  const [lodding, setLodding] = React.useState<boolean>(false);
  const [UserMessages, setUserMessages] = React.useState<UserMessageProps[]>(
    []
  );

  React.useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLodding(true);
        const config: any = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Important for sending cookies
        };
        const response = await fetch(
          HostUrls + "/api/users/get/messages/",
          config
        );
        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message);
        } else {
          setUserMessages(data.messages); // Store messages in state
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLodding(false);
      }
    };

    fetchMessages();
  }, []); // Run once when component mounts

  const rows: any[] = [];
  UserMessages.forEach((element: any, index) => {
    const data: any = {
      sn: index + 1,
      id: element?._id,
      name: element.user.username,
      email: element.user.email,
      pdf:element.pdf_file,
      message: element.message,
      date_time: element.createdAt,
    };
    rows.push(data);
  });
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
