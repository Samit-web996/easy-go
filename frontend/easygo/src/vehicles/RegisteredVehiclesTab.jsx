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
import axios from "axios";
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

      await axios.post("http://localhost:3006/update-vehicle-status", {
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
        const result = await axios.get("http://localhost:3006/view-cars");
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
    <div
      className="  rounded-lg 
  border 
  border-gray-300 dark:border-gray-700
  bg-white dark:bg-gray-800
  transition
"
    >
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
        Vehicle Registered List
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
                "Registeration Number",
                "Car Name",
                "Brand",
                "Seats",
                "Fuel",
                "Price/Day",
                "Status",
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
                  {row.registrationNum}
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
                {/* <TableCell> */}
                  <TableCell sx={{ borderBottom: "none" }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleToggleStatus(row)}
                      sx={{
                        backgroundColor:
                          row.status === "AVAILABLE" ? "#00e676" : "#ff1744",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor:
                            row.status === "AVAILABLE" ? "#00c853" : "#d50000",
                        },
                        minWidth: "auto",
                        padding: "4px 10px",
                        fontSize: "12px",
                      }}
                    >
                      {row.status}
                    </Button>
                  </TableCell>
                {/* </TableCell> */}
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
    </div>
  );
}
