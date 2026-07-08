const database = require('../../../Model/dbConnect')

const addEmployees = (req, res) => {
      const {eid, name,aadhar, mobile,address, email,joining_Date,roleid, deptid, salary } = req.body;

      if (!eid || eid === "") {
    return res.status(400).json({ message: "Employee ID must be provided!" });
}

      const sql = "INSERT INTO employee (eid, name,aadhar, mobile,address, email,joining_Date,roleid,deptid, salary) VALUES (?,? ,?, ?,?,?, ?, ?,?,?)";
      const values = [eid, name,aadhar, mobile,address, email,joining_Date,roleid,deptid, salary];

      database.query(sql , values , (err , result) =>{
            if(err){
                  console.error(err);
                  return res.status(500).json({message :"Database Error" })
            }
            else{res.status(200).json({message : "Employee added successfully" })}
      })
};

const getEmployees = (req,res) =>{
      database.query("SELECT * FROM employee" , (err,result) =>{
            if(err){
                  return res,status(500).json(err)
            }
            res.send(result)
      })
};

const getRole = (req,res) =>{
      database.query("SELECT * FROM role" , (err,result) =>{
            if(err){
                  return res,status(500).json(err)
            }
            res.send(result)
      })
};

const getDept = (req,res) =>{
      database.query("SELECT * FROM department" , (err,result) =>{
            if(err){return res,status(500).json(err)}
            res.send(result)
      })
};


module.exports = {addEmployees , getEmployees,getRole,getDept}