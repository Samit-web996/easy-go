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
import API from "../api";
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
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNameClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
    console.log(row);
  };

  useEffect(() => {
    const getVehicleTable = async () => {
      try {
        const result = await API.get("/vehicle-req");

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
        confirmButton:
          actionType === "approve"
            ? "cursor-pointer inline-flex items-center justify-center px-7 py-3 mx-2 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md shadow-blue-500/20 tracking-wide min-w-[130px]"
            : "cursor-pointer inline-flex items-center justify-center px-7 py-3 mx-2 rounded-xl text-base font-semibold text-white bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-200 shadow-md shadow-red-500/20 tracking-wide min-w-[130px]",

        cancelButton:
          "cursor-pointer inline-flex items-center justify-center px-7 py-3 mx-2 rounded-xl text-base font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-[#161b22] dark:text-gray-300 dark:hover:bg-[#21262d] dark:border dark:border-gray-800 active:scale-95 transition-all duration-200 tracking-wide min-w-[130px]",

        actions: "flex flex-wrap items-center justify-center gap-4 mt-6 w-full",
        popup:
          "rounded-2xl shadow-2xl p-8 bg-white border border-gray-100 dark:bg-[#0d1117] dark:border-gray-800 max-w-[90vw] sm:max-w-md transition-all",
        title:
          "text-xl font-bold text-gray-900 dark:text-white pt-3 tracking-wide",
        htmlContainer:
          "text-sm text-gray-500 dark:text-gray-400 mt-3 font-medium leading-relaxed px-2",
      },
      buttonsStyling: false,
    });

    const successConfirmClass =
      "cursor-pointer inline-flex items-center justify-center px-7 py-3 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md min-w-[120px]";

    swalWithBootstrapButtons
      .fire({
        title: "Confirm Authorization",
        html: `Are you absolute sure you want to <span class="${actionType === "approve" ? "text-blue-500 font-bold" : "text-red-500 font-bold"} uppercase">${actionType}</span> this vehicle request?`,
        icon: "warning",
        iconColor: actionType === "approve" ? "#3b82f6" : "#ef4444",
        showCancelButton: true,
        confirmButtonText: `Yes, ${actionType} it!`,
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await API.post(`/vehicle-approve`, {
              registrationNum: regNum,
              status: actionType,
            });

            swalWithBootstrapButtons.fire({
              title:
                actionType === "approve"
                  ? "Authorized Successfully!"
                  : "Rejected Instance!",
              html: `Vehicle credentials have been flagged as <span class="font-bold">${actionType}d</span> instantly.`,
              icon: "success",
              iconColor: "#10b981",
              customClass: {
                confirmButton: successConfirmClass,
                popup:
                  "rounded-2xl p-8 bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-gray-800 max-w-[90vw] sm:max-w-md",
                title: "text-xl font-bold text-gray-900 dark:text-white pt-3",
                htmlContainer: "text-sm text-gray-500 dark:text-gray-400 mt-3",
              },
            });

            setRows((prev) =>
              prev.filter((car) => car.registrationNum !== regNum),
            );
          } catch (err) {
            console.error(err);
            Swal.fire({
              title: "Execution Error",
              text: "Something went wrong during data commit workflow.",
              icon: "error",
              iconColor: "#ef4444",
              customClass: {
                confirmButton:
                  "cursor-pointer inline-flex items-center justify-center px-7 py-3 rounded-xl text-base font-semibold text-white bg-red-500 hover:bg-red-600 transition-all min-w-[120px]",
                popup:
                  "rounded-2xl p-8 bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-gray-800",
              },
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
      const res = await API.get(`/view-vehicle-information/${carid}`);
      const data = Array.isArray(res.data) ? res.data[0] : res.data;
      setVehicleInfo(data);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors shadow-sm w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-5 text-gray-900 dark:text-white tracking-tight">
        Pending vehicle request...
      </h2>

      {/* Search Bar */}
      <div className="mb-5 w-full">
        <TextField
          label="Search Registration number..."
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              transition: "all 0.2s",
              "& fieldset": { borderColor: "#e5e7eb" },
              "&:hover fieldset": { borderColor: "#d1d5db" },
              "&.Mui-focused fieldset": { borderColor: "#2563eb" },
            },
            ".dark & .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "#3f3f46" },
              "&:hover fieldset": { borderColor: "#52525b" },
              "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
            },
            "& .MuiInputLabel-root": {
              color: "#6b7280",
              fontSize: "14px",
            },
            ".dark & .MuiInputLabel-root": {
              color: "#a1a1aa",
            },
          }}
        />
      </div>

      {/* Table Section Wrap */}
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm w-full bg-white dark:bg-zinc-900">
        <div className="w-full overflow-x-auto pb-1">
          <Table className="min-w-[1000px]">
            <TableHead>
              <TableRow className="bg-blue-600 dark:bg-blue-700">
                {[
                  "Name As per RC",
                  "Email",
                  "Car Name",
                  "Brand",
                  "Seats",
                  "Fuel",
                  "Price/Day",
                  "Status",
                  "View more",
                  "Action",
                ].map((h) => (
                  <TableCell
                    key={h}
                    className="!text-white !font-bold !py-3.5 !border-none tracking-wide text-xs uppercase"
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Body Configuration Elements */}
            <TableBody>
              {paginatedRows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center !py-8 !text-gray-400 dark:!text-zinc-500 font-medium"
                  >
                    No pending vehicle registration matches found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRows.map((row, index) => (
                  <TableRow
                    key={index}
                    className="bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800/60 hover:bg-gray-50 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <TableCell className="!text-gray-900 dark:!text-zinc-100 !font-semibold">
                      <span
                        className="cursor-pointer underline decoration-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNameClick(row);
                        }}
                      >
                        {row.owner_name}
                      </span>
                    </TableCell>

                    <TableCell className="!text-gray-600 dark:!text-zinc-400 !font-medium">
                      {row.email}
                    </TableCell>
                    <TableCell className="!text-gray-900 dark:!text-zinc-100 !font-semibold">
                      {row.carName}
                    </TableCell>
                    <TableCell className="!text-gray-700 dark:!text-zinc-300 !font-medium">
                      {row.brand}
                    </TableCell>
                    <TableCell className="!text-gray-800 dark:!text-zinc-200">
                      <span className="bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md font-mono text-xs font-bold border border-gray-200 dark:border-zinc-700">
                        {row.seat} str
                      </span>
                    </TableCell>
                    <TableCell className="!text-gray-700 dark:!text-zinc-300 !font-medium">
                      {row.fuelType}
                    </TableCell>
                    <TableCell className="!text-gray-900 dark:!text-zinc-100 !font-bold">
                      ₹{row.pricePerDay?.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border min-w-[90px] text-center
                          ${
                            row.status?.toLowerCase() === "available" ||
                            row.status?.toLowerCase() === "approved"
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-500 border-amber-200 dark:border-amber-500/20"
                          }`}
                      >
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => VehicleInfo(row.carid)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700 transition-all active:scale-95 cursor-pointer"
                        title="Quick View"
                      >
                        <FaEye size={14} />
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleAction(row.registrationNum, "approve")
                          }
                          className="cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all bg-emerald-500/10 hover:bg-emerald-600 text-emerald-500 hover:text-white border border-emerald-500/20 active:scale-95 shadow-sm"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            handleAction(row.registrationNum, "reject")
                          }
                          className="cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all bg-rose-500/10 hover:bg-rose-600 text-rose-500 hover:text-white border border-rose-500/20 active:scale-95 shadow-sm"
                        >
                          Reject
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Section controls configuration */}
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
            borderTop: "1px solid",
            borderColor: "rgba(0,0,0,0.05)",
            ".dark &": {
              borderColor: "rgba(255,255,255,0.05)",
            },
            "& .MuiTablePagination-toolbar": {
              color: "#4b5563",
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                color: "#4b5563",
                fontWeight: 500,
              },
            "& .MuiSvgIcon-root": {
              color: "#4b5563",
            },
            ".dark & .MuiTablePagination-toolbar": {
              color: "#a1a1aa",
            },
            ".dark & .MuiTablePagination-selectLabel, .dark & .MuiTablePagination-displayedRows":
              {
                color: "#a1a1aa",
              },
            ".dark & .MuiSvgIcon-root": {
              color: "#a1a1aa",
            },
          }}
        />
      </div>

      {/* Structural Drawers & Modals References */}
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
