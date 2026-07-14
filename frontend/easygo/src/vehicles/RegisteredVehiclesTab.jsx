import {
  Table,
  TableBody,
  TableCell,
  TextField,
  TableHead,
  TableRow,
  TablePagination,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import API from "../api";
import RightDrawer from "./RightDrawer";

export default function RegisteredVehicles() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleToggleStatus = async (row) => {
    try {
      const newStatus =
        row.status === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE";

      await API.post("/update-vehicle-status", {
        carid: row.carid,
        status: newStatus,
      });

      setRows((prev) =>
        prev.map((item) =>
          item.carid === row.carid ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleNameClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  useEffect(() => {
    const getVehicleTable = async () => {
      try {
        const result = await API.get("/view-cars");
        setRows(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    getVehicleTable();
  }, []);

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

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors shadow-sm w-full">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold mb-5 text-gray-900 dark:text-white tracking-tight">
        Vehicle Registered List
      </h2>

      {/* Search */}
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

      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm w-full bg-white dark:bg-zinc-900">
        <div className="w-full overflow-x-auto pb-1">
          <Table className="min-w-[1050px]">
            <TableHead>
              <TableRow className="bg-blue-600 dark:bg-blue-700">
                {[
                  "Name As per RC",
                  "Email",
                  "Registration Number",
                  "Car Name",
                  "Brand",
                  "Seats",
                  "Fuel",
                  "Price/Day",
                  "Status",
                ].map((h) => (
                  <TableCell key={h} className="!text-white !font-bold !py-3.5 !border-none tracking-wide text-xs uppercase">
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Body */}
            <TableBody>
              {paginatedRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center !py-8 !text-gray-400 dark:!text-zinc-500 font-medium">
                    No registered vehicles found.
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
                    <TableCell className="!text-gray-900 dark:!text-zinc-300 font-mono font-bold text-xs tracking-wider">
                      {row.registrationNum}
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
                      ₹{row.pricePerDay?.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleToggleStatus(row)}
                        className="cursor-pointer font-bold tracking-wide uppercase transition-all duration-150 active:scale-95"
                        sx={{
                          boxShadow: "none",
                          borderRadius: "12px",
                          padding: "6px 14px",
                          fontSize: "11px",
                          backgroundColor:
                            row.status === "AVAILABLE"
                              ? "rgba(16, 185, 129, 0.12)"
                              : "rgba(244, 63, 94, 0.12)",
                          color: row.status === "AVAILABLE" ? "#10b981" : "#f43f5e",
                          border: "1px solid",
                          borderColor:
                            row.status === "AVAILABLE"
                              ? "rgba(16, 185, 129, 0.25)"
                              : "rgba(244, 63, 94, 0.25)",
                          "&:hover": {
                            backgroundColor: row.status === "AVAILABLE" ? "#10b981" : "#f43f5e",
                            color: "#fff",
                            boxShadow: "none",
                          },
                          minWidth: "105px",
                        }}
                      >
                        {row.status}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls Wrapper */}
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
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              color: "#4b5563",
              fontWeight: 500,
            },
            "& .MuiSvgIcon-root": {
              color: "#4b5563",
            },
            ".dark & .MuiTablePagination-toolbar": {
              color: "#a1a1aa",
            },
            ".dark & .MuiTablePagination-selectLabel, .dark & .MuiTablePagination-displayedRows": {
              color: "#a1a1aa",
            },
            ".dark & .MuiSvgIcon-root": {
              color: "#a1a1aa",
            },
          }}
        />
      </div>

      {/* Drawer Rendering */}
      <RightDrawer
        open={open}
        onClose={() => setOpen(false)}
        data={selectedRow}
      />
    </div>
  );
}