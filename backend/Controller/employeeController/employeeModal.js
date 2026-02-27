const database = require('../../Model/dbConnect');

const addEmployees = (req, res) => {
      const {eid, ename , mobile , email , salary , DOJ } = req.body;

      if (!eid || eid === "") {
    return res.status(400).json({ message: "Employee ID zaroori hai bhai!" });
}

      const sql = "INSERT INTO employee (eid,ename , mobile , email , salary , DOJ) VALUES (?, ?, ?, ?, ?,?)";
      const values = [eid,ename, mobile, email, salary, DOJ];

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