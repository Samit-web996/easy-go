const { json } = require('express');
const conn = require('../../../Model/dbConnect')


const getEmployees = (req, res) => {      
      const sql = "SELECT * FROM employee";
      conn.query(sql, (err, results) => {
            if (err) {
                  console.error('Error fetching employees:', err);
                  res.status(500).json({ error: 'Failed to fetch employees' });
            } else {
                  res.json(results);
            }                       
      });
};
const getEmployee = (req,res) => {
      // const sql = "SELECT * FROM employee WHERE eid = ?";
      const sql = `SELECT e.*, r.rolename, d.deptname FROM employee e LEFT OUTER JOIN role r using(roleid) LEFT OUTER JOIN department d using(deptid) WHERE eid = ?`;
      const eid = req.params.eid
      conn.query(sql ,eid, (err,result) => {
            if(err){
                  console.error('Error Fetching by eid employee :' , err)
                  res.status(500),json({error : "Failed to fetch employees by eid" })
            }else{
                  // console.log(result)
                  res.json(result)
            }
            
      });
};

const updateEmployee = (req,res) =>{
      const {aadhar, mobile,address, email,joining_Date,roleid,deptid, salary} = req.body;
      const eid = req.params.eid
      const formattedDate = joining_Date ? joining_Date.split('T')[0] : null;
      const sql = "UPDATE employee SET aadhar = ?, mobile = ?,address = ?, email = ?,joining_Date = ?,roleid = ?,deptid = ?, salary = ?  WHERE eid = ?"
      conn.query(sql , [aadhar, mobile,address, email,formattedDate,roleid,deptid, salary, eid] , (err,result) => {
            if(err){console.log("Error fetching employees:", err)}
            else{res.json(result)}
            //console.log(result.info)
      });
};

// const updateRole = (req, res) => {
//       const { role, eid } = req.body;
//       const query = "UPDATE employee SET role = ? WHERE eid = ?";
//       conn.query(query ,[role,eid], (err, result) => {
//             if(err){
//                   console.log("Error fetching employees:", err);
//             }else {res.json(result)}
// })
// };

module.exports = {getEmployees,getEmployee,updateEmployee};    