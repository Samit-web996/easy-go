const database = require('../../Model/dbConnect');

const addEmployees = (req, res) => {
      const {eid, name,addhar, mobile,address, email,joining_Date, salary } = req.body;

      if (!eid || eid === "") {
    return res.status(400).json({ message: "Employee ID zaroori hai bhai!" });
}

      const sql = "INSERT INTO employee (eid, name,addhar, mobile,address, email,joining_Date, salary) VALUES (?, ?, ?,?,?, ?, ?,?)";
      const values = [eid, name,addhar, mobile,address, email,joining_Date, salary];

      database.query(sql , values , (err , result) =>{
            if(err){
                  console.error(err);
                  return res.status(500).json({message :"Database Error" })
            }
            else{res.status(200).json({message : "Employee added successfully" , employeeId : result.insertId})}
      })
};

const getEmployees = (req,res) =>{
      database.query("SELECT * FROM employee" , (err,result) =>{
            if(err){
                  return res,status(500).json(err);
                  res.send(result)
            }
      })
};

module.exports = {addEmployees , getEmployees}