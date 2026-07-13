import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import API from '../api';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {

  const [users, setUsers] = useState([]);
    const [setError] = useState(null);

   useEffect(() => {
    const fetchClient = async () => {
      try {
        // const baseUrl = import.meta.env.VITE_API_URL || 'https://easygo-backend.onrender.com';
        const res = await API.get('/client-approval');
        setUsers(res.data); 
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchClient();
  }, []); 
const handleStatusUpdate = async (uid, newStatus) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: newStatus === 'verified'
        ? "cursor-pointer inline-flex items-center justify-center px-7 py-2.5 mx-2 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/20 tracking-wide min-w-[130px]"
        : "cursor-pointer inline-flex items-center justify-center px-7 py-2.5 mx-2 rounded-full text-sm font-bold text-white bg-red-500 hover:bg-red-600 active:scale-95 transition-all shadow-md shadow-red-500/20 tracking-wide min-w-[130px]",
      
      cancelButton: "cursor-pointer inline-flex items-center justify-center px-7 py-2.5 mx-2 rounded-full text-sm font-bold text-white bg-[#161b22] hover:bg-[#21262d] active:scale-95 transition-all tracking-wide min-w-[130px] border border-gray-800",
      
      actions: "flex flex-wrap items-center justify-center gap-3 mt-6 w-full",
      popup: "rounded-2xl shadow-2xl p-8 bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-gray-800 max-w-[90vw] sm:max-w-md",
      title: "text-2xl font-bold text-gray-700 dark:text-gray-200 pt-2 tracking-wide",
      htmlContainer: "text-base text-gray-500 dark:text-gray-400 mt-3 font-medium leading-relaxed"
    },
    buttonsStyling: false
  });

  const secondaryConfirmClass = "cursor-pointer inline-flex items-center justify-center px-7 py-2.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all min-w-[120px]";

  swalWithBootstrapButtons.fire({
    title: "Confirm Authorization",
    html: `Are you absolute sure you want to <span class="${newStatus === 'verified' ? 'text-blue-600 font-bold' : 'text-red-500 font-bold'} uppercase">${newStatus === 'verified' ? 'APPROVE' : 'REJECT'}</span> this client verification?`,
    icon: "warning",
    iconColor: newStatus === 'verified' ? '#2563eb' : '#ef4444',
    showCancelButton: true,
    confirmButtonText: newStatus === 'verified' ? "Yes, approve it!" : "Yes, reject it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then(async (result) => {
    
    if (result.isConfirmed) {
      try {
        const res = await API.post('/api/update-client-status', {
          uid: uid,
          verification_status: newStatus
        });

        if (res.data.success) {
          setUsers((prev) =>
            prev.map((user) =>
              user.uid === uid ? { ...user, verification_status: newStatus } : user
            )
          );

          swalWithBootstrapButtons.fire({
            title: newStatus === 'verified' ? "Authorized Successfully!" : "Status Revoked!",
            html: `Client credentials have been flagged as <span class="font-bold">${newStatus}</span> instantly.`,
            icon: "success",
            iconColor: "#10b981",
            customClass: {
              confirmButton: secondaryConfirmClass,
              popup: "rounded-2xl p-8 bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-gray-800 max-w-[90vw] sm:max-w-md",
              title: "text-xl font-bold text-gray-900 dark:text-white pt-2",
              htmlContainer: "text-sm text-gray-500 dark:text-gray-400 mt-2"
            }
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
            confirmButton: "cursor-pointer inline-flex items-center justify-center px-7 py-2.5 rounded-full text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-all min-w-[120px]",
            popup: "rounded-2xl p-8 bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-gray-800"
          }
        });
      }
    } 
    
    else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled Action",
        text: "Client validation check remains unchanged.",
        icon: "info",
        iconColor: "#3b82f6",
        customClass: {
          confirmButton: secondaryConfirmClass,
          popup: "rounded-2xl p-8 bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-gray-800"
        }
      });
    }
  });
};


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User Id</StyledTableCell>
            <StyledTableCell align="right">Full Name</StyledTableCell>
            <StyledTableCell align="right">Aadhar Number</StyledTableCell>
            <StyledTableCell align="right">License Number</StyledTableCell>
            <StyledTableCell align="right">User's Address</StyledTableCell>
            <StyledTableCell align="right">Mobile Number</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((users,index) => (
            <StyledTableRow key={users.uid || index}>
              <StyledTableCell component="th" scope="row">
                {users.uid || index}
              </StyledTableCell>
              <StyledTableCell align="right">{users.full_name}</StyledTableCell>
              <StyledTableCell align="right">{users.aadhar_no}</StyledTableCell>
              <StyledTableCell align="right">{users.license_no}</StyledTableCell>
              <StyledTableCell align="right">{users.current_address}</StyledTableCell>
              <StyledTableCell align="right">{users.mobile_no}</StyledTableCell>
              <StyledTableCell align="right">{users.verification_status || "Pending"}</StyledTableCell>
              <StyledTableCell align="right">
  <div className="flex items-center justify-center gap-2.5 w-full p-1">
  {/* Approve Button: Clean Green Solid Capsule */}
  <button 
    onClick={() => handleStatusUpdate(users.uid, 'verified')}
    className="cursor-pointer inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-[#00c853] hover:bg-[#00e676] active:scale-95 transition-all duration-150 min-w-[75px] tracking-wide"
  >
    Approve
  </button>

  {/* Reject Button: Clean Red Solid Capsule */}
  <button 
    onClick={() => handleStatusUpdate(users.uid, 'rejected')}
    className="cursor-pointer inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-[#ff2d46] hover:bg-[#ff4d63] active:scale-95 transition-all duration-150 min-w-[75px] tracking-wide"
  >
    Reject
  </button>
</div>
</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
