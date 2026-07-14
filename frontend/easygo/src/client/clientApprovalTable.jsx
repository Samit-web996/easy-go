import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import API from "../api";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: "11px",
    letterSpacing: "0.05em",
    padding: "14px 16px",
    borderBottom: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "14px 16px",
    color: "inherit !important",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: "transparent !important",
  borderBottom: "1px solid #e5e7eb",
  transition: "background-color 0.15s ease",

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.02) !important",
  },

  ".dark &": {
    borderColor: "#27272a",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.03) !important",
    },
  },
}));

export default function CustomizedTables() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await API.get("/client-approval");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClient();
  }, []);

  const handleStatusUpdate = async (uid, newStatus) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          newStatus === "verified"
            ? "cursor-pointer inline-flex items-center justify-center px-7 py-2.5 mx-2 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/20 tracking-wide min-w-[130px]"
            : "cursor-pointer inline-flex items-center justify-center px-7 py-2.5 mx-2 rounded-full text-sm font-bold text-white bg-red-500 hover:bg-red-600 active:scale-95 transition-all shadow-md shadow-red-500/20 tracking-wide min-w-[130px]",

        cancelButton:
          "cursor-pointer inline-flex items-center justify-center px-7 py-2.5 mx-2 rounded-full text-sm font-bold text-white bg-[#161b22] hover:bg-[#21262d] active:scale-95 transition-all tracking-wide min-w-[130px] border border-gray-800",

        actions: "flex flex-wrap items-center justify-center gap-3 mt-6 w-full",
        popup:
          "rounded-2xl shadow-2xl p-8 bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-gray-800 max-w-[90vw] sm:max-w-md",
        title:
          "text-2xl font-bold text-gray-700 dark:text-gray-200 pt-2 tracking-wide",
        htmlContainer:
          "text-base text-gray-500 dark:text-gray-400 mt-3 font-medium leading-relaxed",
      },
      buttonsStyling: false,
    });

    const secondaryConfirmClass =
      "cursor-pointer inline-flex items-center justify-center px-7 py-2.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all min-w-[120px]";

    swalWithBootstrapButtons
      .fire({
        title: "Confirm Authorization",
        html: `Are you absolute sure you want to <span class="${newStatus === "verified" ? "text-blue-600 font-bold" : "text-red-500 font-bold"} uppercase">${newStatus === "verified" ? "APPROVE" : "REJECT"}</span> this client verification?`,
        icon: "warning",
        iconColor: newStatus === "verified" ? "#2563eb" : "#ef4444",
        showCancelButton: true,
        confirmButtonText:
          newStatus === "verified" ? "Yes, approve it!" : "Yes, reject it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await API.post("/api/update-client-status", {
              uid: uid,
              verification_status: newStatus,
            });

            if (res.data.success) {
              setUsers((prev) =>
                prev.map((user) =>
                  user.uid === uid
                    ? { ...user, verification_status: newStatus }
                    : user,
                ),
              );

              swalWithBootstrapButtons.fire({
                title:
                  newStatus === "verified"
                    ? "Authorized Successfully!"
                    : "Status Revoked!",
                html: `Client credentials have been flagged as <span class="font-bold">${newStatus}</span> instantly.`,
                icon: "success",
                iconColor: "#10b981",
                customClass: {
                  confirmButton: secondaryConfirmClass,
                  popup:
                    "rounded-2xl p-8 bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-gray-800 max-w-[90vw] sm:max-w-md",
                  title: "text-xl font-bold text-gray-900 dark:text-white pt-2",
                  htmlContainer:
                    "text-sm text-gray-500 dark:text-gray-400 mt-2",
                },
              });
            }
          } catch (err) {
            console.error("Status update error:", err);
            swalWithBootstrapButtons.fire({
              title: "Execution Error",
              text: "Failed to update status on server framework.",
              icon: "error",
              iconColor: "#ef4444",
              customClass: {
                confirmButton:
                  "cursor-pointer inline-flex items-center justify-center px-7 py-2.5 rounded-full text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-all min-w-[120px]",
                popup:
                  "rounded-2xl p-8 bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-gray-800",
              },
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled Action",
            text: "Client validation check remains unchanged.",
            icon: "info",
            iconColor: "#3b82f6",
            customClass: {
              confirmButton: secondaryConfirmClass,
              popup:
                "rounded-2xl p-8 bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-gray-800",
            },
          });
        }
      });
  };

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors shadow-sm w-full overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold mb-5 text-gray-900 dark:text-white tracking-tight">
        Client Verification Overview
      </h2>

      <TableContainer
        component={Paper}
        elevation={0}
        className="w-full overflow-x-auto border border-gray-100 dark:border-zinc-800/80 rounded-xl"
        style={{ backgroundColor: "transparent" }}
      >
        <Table sx={{ minWidth: 1100 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User Id</StyledTableCell>
              <StyledTableCell align="left">Full Name</StyledTableCell>
              <StyledTableCell align="left">Aadhar Registry</StyledTableCell>
              <StyledTableCell align="left">License Number</StyledTableCell>
              <StyledTableCell align="left">User's Address</StyledTableCell>
              <StyledTableCell align="left">Mobile Number</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100">
            {users.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={8}
                  align="center"
                  className="text-gray-400 dark:text-zinc-500 !py-8 font-medium"
                >
                  No active client verification requests available.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              users.map((user, index) => (
                <StyledTableRow key={user.uid || index}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className="font-mono text-xs text-gray-900 dark:text-white"
                  >
                    <span className="bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-lg border border-gray-200 dark:border-zinc-700 font-bold">
                      #{String(user.uid || index).padStart(3, "0")}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    {user.full_name}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    className="font-mono text-xs tracking-wider text-gray-500 dark:text-zinc-400"
                  >
                    {user.aadhar_no ? "[Aadhaar Redacted]" : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    className="font-mono text-xs tracking-wide text-gray-700 dark:text-zinc-300"
                  >
                    {user.license_no || "N/A"}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    className="max-w-[200px] truncate text-gray-600 dark:text-zinc-400"
                  >
                    {user.current_address}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    className="font-medium text-gray-800 dark:text-zinc-200"
                  >
                    {user.mobile_no}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border min-w-[95px] text-center
                        ${
                          user.verification_status?.toLowerCase() === "verified"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : user.verification_status?.toLowerCase() ===
                                "rejected"
                              ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                              : "bg-amber-500/10 text-amber-500 border-amber-200 dark:border-amber-500/20"
                        }`}
                    >
                      {user.verification_status || "Pending"}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="flex items-center justify-center gap-2.5 w-full">
                      <button
                        onClick={() => handleStatusUpdate(user.uid, "verified")}
                        className="cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all bg-emerald-500/10 hover:bg-emerald-600 text-emerald-500 hover:text-white border border-emerald-500/20 active:scale-95 shadow-sm min-w-[80px]"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleStatusUpdate(user.uid, "rejected")}
                        className="cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all bg-rose-500/10 hover:bg-rose-700 text-rose-500 hover:text-white border border-rose-500/20 active:scale-95 shadow-sm min-w-[80px]"
                      >
                        Reject
                      </button>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
