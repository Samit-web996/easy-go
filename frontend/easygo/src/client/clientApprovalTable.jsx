import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function CustomizedTables() {

  const [users, setUsers] = useState([]);
    const [setError] = useState(null);

   useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get('http://localhost:3006/client-approval');
        setUsers(res.data); // Database se aaya array state mein set ho gaya
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchClient();
  }, []); 
  // CustomizedTables.js ke andar
const handleStatusUpdate = async (uid, newStatus) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-2",
      cancelButton: "btn btn-danger mx-2"
    },
    buttonsStyling: false
  });

  // 1. Pehle Alert show hoga
  swalWithBootstrapButtons.fire({
    title: `Are you sure you want to ${newStatus}?`,
    text: "You can change this status again later if needed.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: `Yes, ${newStatus} it!`,
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then(async (result) => {
    // 2. Agar admin "Yes" click karta hai
    if (result.isConfirmed) {
      try {
        const res = await axios.post('http://localhost:3006/api/update-client-status', {
          uid: uid,
          verification_status: newStatus
        });

        if (res.data.success) {
          // UI update logic
          setUsers((prev) =>
            prev.map((user) =>
              user.uid === uid ? { ...user, verification_status: newStatus } : user
            )
          );

          // Success Alert
          swalWithBootstrapButtons.fire({
            title: "Updated!",
            text: `Client has been ${newStatus}.`,
            icon: "success"
          });
        }
      } catch (err) {
        console.error("Status update error:", err);
        swalWithBootstrapButtons.fire({
          title: "Error",
          text: "Failed to update status on server.",
          icon: "error"
        });
      }
    } 
    // 3. Agar admin cancel karta hai, toh kuch nahi hoga (status pending hi rahega)
    else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "No changes were made.",
        icon: "info"
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
  <div className="flex gap-2 justify-end">
    <button 
      onClick={() => handleStatusUpdate(users.uid, 'verified')}
      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs transition"
    >
      Verify
    </button>
    <button 
      onClick={() => handleStatusUpdate(users.uid, 'rejected')}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition"
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
