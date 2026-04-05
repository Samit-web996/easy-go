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

  const handleApprove = (regNum) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-500 text-white px-3 py-1 x.5 rounded-md",
        cancelButton: "bg-red-500 text-white px-3 py-1.5 rounded-md ml-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You want to approve this vehicle?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, approve it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.post("http://localhost:3006/vehicle-approve", {
              registrationNum: regNum,
            });

            swalWithBootstrapButtons.fire({
              title: "Approved!",
              text: "Vehicle approved successfully.",
              icon: "success",
            });

            setRows((prev) =>
              prev.filter((car) => car.registrationNum !== regNum),
            );
          } catch (err) {
            console.log(err);
            Swal.fire("Error", "Something went wrong", "error");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Approval cancelled !!!",
            icon: "error",
          });
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
  async function VehicleInfo(email) {
    if (email === undefined || email === null) return;
    try {
      const res = await axios.get(`http://localhost:3006/view-vehicle-information/${email}`);
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
                "Name",
                "Email",
                "Car Name",
                "Brand",
                "Seats",
                "Fuel",
                "Price/KM",
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
                  ₹{row.price_per_km}
                </TableCell>
                <TableCell className="!text-black dark:!text-white">
                  {row.status}
                </TableCell>
                <TableCell className="cursor-pointer !text-black dark:!text-white">
                  <div>
                    <button onClick={() => VehicleInfo(row.email)}>👁️</button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(row.registrationNum)}
                      className="cursor-pointer min-w-[60px] px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 bg-green-500 text-white hover:bg-green-600"
                    >
                      Approve
                    </button>

                    <button className="cursor-pointer min-w-[60px] px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 bg-red-500 text-white hover:bg-red-600">
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
