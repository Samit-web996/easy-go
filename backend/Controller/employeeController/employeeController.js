const conn = require('../../Model/dbConnect');

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

const updateRole = (req, res) => {
      const { role, eid } = req.body;
      const query = "UPDATE employee SET role = ? WHERE eid = ?";
      conn.query(query ,[role,eid], (err, result) => {
            if(err){
                  console.log("Error fetching employees:", err);
            }else {res.json(result)}
})
};

module.exports = {getEmployees, updateRole};    