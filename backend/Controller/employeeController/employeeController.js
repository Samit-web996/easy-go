const conn = require('../../Model/dbConnect');

const getEmployees = (req, res) => {      
      const sql = "SELECT LPAD(eid, 3, '0') AS eid, ename, mobile, email, aadhar, DOJ, salary FROM employee";
      conn.query(sql, (err, results) => {
            if (err) {
                  console.error('Error fetching employees:', err);
                  res.status(500).json({ error: 'Failed to fetch employees' });
            } else {
                  res.json(results);
            }                       
      });
};

module.exports = getEmployees;    