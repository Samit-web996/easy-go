import {
  Table,
  TableBody,
  TableCell,
  TextField,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import RightDrawer from "./RightDrawer";
import RequestView from "./ReqView";
import { FaEye } from "react-icons/fa";

export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [vehicleInfo,setVehicleInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNameClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
    console.log(row)
  };

  useEffect(() => {
    const getVehicleTable = async () => {
      try {
        const result = await axios.get("http://localhost:3006/vehicle-req");

        setRows(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    getVehicleTable();
  }, []);

const handleAction = (regNum, actionType) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: actionType === 'approve' 
        ? "cursor-pointer inline-flex items-center justify-center px-7 py-3 mx-2 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md shadow-blue-500/20 tracking-wide min-w-[130px]"
        : "cursor-pointer inline-flex items-center justify-center px-7 py-3 mx-2 rounded-xl text-base font-semibold text-white bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-200 shadow-md shadow-red-500/20 tracking-wide min-w-[130px]",
      
      cancelButton: "cursor-pointer inline-flex items-center justify-center px-7 py-3 mx-2 rounded-xl text-base font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-[#161b22] dark:text-gray-300 dark:hover:bg-[#21262d] dark:border dark:border-gray-800 active:scale-95 transition-all duration-200 tracking-wide min-w-[130px]",
      
      actions: "flex flex-wrap items-center justify-center gap-4 mt-6 w-full", 
      popup: "rounded-2xl shadow-2xl p-8 bg-white border border-gray-100 dark:bg-[#0d1117] dark:border-gray-800 max-w-[90vw] sm:max-w-md transition-all",
      title: "text-xl font-bold text-gray-900 dark:text-white pt-3 tracking-wide",
      htmlContainer: "text-sm text-gray-500 dark:text-gray-400 mt-3 font-medium leading-relaxed px-2"
    },
    buttonsStyling: false,
  });

  const successConfirmClass = "cursor-pointer inline-flex items-center justify-center px-7 py-3 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md min-w-[120px]";

  swalWithBootstrapButtons
    .fire({
      title: "Confirm Authorization",
      html: `Are you absolute sure you want to <span class="${actionType === 'approve' ? 'text-blue-500 font-bold' : 'text-red-500 font-bold'} uppercase">${actionType}</span> this vehicle request?`, 
      icon: "warning",
      iconColor: actionType === 'approve' ? '#3b82f6' : '#ef4444',
      showCancelButton: true,
      confirmButtonText: `Yes, ${actionType} it!`,
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(`http://localhost:3006/vehicle-approve`, {
            registrationNum: regNum,
            status: actionType
          });

          swalWithBootstrapButtons.fire({
            title: actionType === 'approve' ? "Authorized Successfully!" : "Rejected Instance!",
            html: `Vehicle credentials have been flagged as <span class="font-bold">${actionType}d</span> instantly.`,
            icon: "success",
            iconColor: "#10b981",
            customClass: {
              confirmButton: successConfirmClass,
              popup: "rounded-2xl p-8 bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-gray-800 max-w-[90vw] sm:max-w-md",
              title: "text-xl font-bold text-gray-900 dark:text-white pt-3",
              htmlContainer: "text-sm text-gray-500 dark:text-gray-400 mt-3"
            }
          });

          setRows((prev) => prev.filter((car) => car.registrationNum !== regNum));

        } catch (err) {
          console.error(err);
          Swal.fire({
            title: "Execution Error",
            text: "Something went wrong during data commit workflow.",
            icon: "error",
            iconColor: "#ef4444",
            customClass: {
              confirmButton: "cursor-pointer inline-flex items-center justify-center px-7 py-3 rounded-xl text-base font-semibold text-white bg-red-500 hover:bg-red-600 transition-all min-w-[120px]",
              popup: "rounded-2xl p-8 bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-gray-800"
            }
          });
        }
      }
    });
};

  const filteredRows = rows.filter(
    (row) =>
      row.carName?.toLowerCase().includes(search.toLowerCase()) ||
      row.brand?.toLowerCase().includes(search.toLowerCase()) ||
      row.registrationNum?.toLowerCase().includes(search.toLowerCase()),
  );

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );
  async function VehicleInfo(carid) {
    if (carid === undefined || carid === null) return;
    try {
      const res = await axios.get(`http://localhost:3006/view-vehicle-information/${carid}`);
       const data = Array.isArray(res.data) ? res.data[0] : res.data;
      setVehicleInfo(data)
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="  rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 transition">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
        Pending vehicle request...
      </h2>

      {/* Search */}
      <TextField
        label="Registration number"
        variant="outlined"
        fullWidth
        size="small"
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff",
          },
          ".dark & .MuiOutlinedInput-root": {
            backgroundColor: "#1f2937",
            color: "white",
          },
          "& .MuiInputLabel-root": {
            color: "black",
          },
          ".dark & .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d1d5db",
          },
          ".dark & .MuiOutlinedInput-notchedOutline": {
            borderColor: "#374151",
          },
        }}
      />

      {/* Table */}
      <div className="rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
        <Table>
          <TableHead>
            <TableRow className="bg-blue-600">
              {[
                "Name As per RC",
                "Email",
                "Car Name",
                "Brand",
                "Seats",
                "Fuel",
                "Price/Day",
                "Status",
                "Veiw more",
                "Action",
              ].map((h) => (
                <TableCell key={h} className="!text-white !font-semibold">
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Body */}
          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow
                key={index}
                className="bg-white dark:bg-gray-800 
                hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <TableCell className="!text-black dark:!text-white">
                  <span
                    className="cursor-pointer underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNameClick(row);
                    }}
                  >
                    {row.owner_name}
                  </span>
                </TableCell>

                <TableCell className="!text-black dark:!text-white">
                  {row.email}
                </TableCell>
                <TableCell className="!text-black dark:!text-white">
                  {row.carName}
                </TableCell>
                <TableCell className="!text-black dark:!text-white">
                  {row.brand}
                </TableCell>
                <TableCell className="!text-black dark:!text-white">
                  {row.seat}
                </TableCell>
                <TableCell className="!text-black dark:!text-white">
                  {row.fuelType}
                </TableCell>
                <TableCell className="!text-black dark:!text-white">
                  ₹{row.pricePerDay}
                </TableCell>
                <TableCell className="!text-black dark:!text-white">
                  {row.status}
                </TableCell>
                <TableCell className="cursor-pointer !text-black dark:!text-white">
                  <div>
                    <button onClick={() => VehicleInfo(row.carid)}><FaEye /></button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAction(row.registrationNum,'approve')}
                      className="cursor-pointer min-w-[60px] px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 bg-green-500 text-white hover:bg-green-600"
                    >
                      Approve
                    </button>

                    <button 
                    onClick={() => handleAction(row.registrationNum, 'reject')}
                    className="cursor-pointer min-w-[60px] px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 bg-red-500 text-white hover:bg-red-600">
                      Reject
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          sx={{
            bgcolor: "transparent",

            // 🔥 MAIN FIX
            "& .MuiTablePagination-toolbar": {
              color: "#000",
            },
            "& .MuiTablePagination-selectLabel": {
              color: "#000",
            },
            "& .MuiTablePagination-displayedRows": {
              color: "#000",
            },
            "& .MuiSvgIcon-root": {
              color: "#000",
            },

            ".dark & .MuiTablePagination-toolbar": {
              color: "#fff",
            },
            ".dark & .MuiTablePagination-selectLabel": {
              color: "#fff",
            },
            ".dark & .MuiTablePagination-displayedRows": {
              color: "#fff",
            },
            ".dark & .MuiSvgIcon-root": {
              color: "#fff",
            },
          }}
        />
      </div>
      <RightDrawer
        open={open}
        onClose={() => setOpen(false)}
        data={selectedRow}
      />
      <RequestView
        isOpen={isModalOpen}
        vehicleInfo={vehicleInfo}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
