const database = require('../../../Model/dbConnect')

const searchLocation = (req, res) => {
  const { loc_id } = req.query; 
  const sql = `SELECT v.* , l.city_name FROM registered_vehicle v JOIN city_list l ON v.loc_id = l.loc_id WHERE l.loc_id = ?`;
  
  database.query(sql, [loc_id], (err, results) => {
    if (err) {
      console.error("Search Location DB Error:", err);
      return res.status(500).json({ success: false, message: "DB Error" });
    }
    return res.status(200).json(results); 
  });
};

const fetchLoc = (req, res) => {
  const sql = "SELECT * FROM city_list";
  
  database.query(sql, (err, result) => {
    if (err) {
      console.error("Database error while fetching cities:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    
    return res.status(200).json(result);
  });
};

module.exports = { searchLocation, fetchLoc };