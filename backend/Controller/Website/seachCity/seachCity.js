const database = require('../../../Model/dbConnect');

// const searchLocation = (req,res) => {
//       const {city} = req.body;

//       const sql = `SELECT v.* , l.city_name FROM registered_vehicle v JOIN city_list l ON v.loc_id = l.loc_id WHERE l.city_name = ?`;

//       database.query(sql , [city] , (err,results) => {
//             if (err) {
//                   return res.status(500).json({success: false, message: "Database Error"})
//             }
//             res.status(200).json({success: true, data: results})
//       });
// };

// Backend Controller (seachCity.js)
const searchLocation = (req, res) => {
  const { loc_id } = req.query; // GET request ke liye hamesha query use karein
  const sql = `SELECT v.* , l.city_name FROM registered_vehicle v JOIN city_list l ON v.loc_id = l.loc_id WHERE l.loc_id = ?`;
  
  database.query(sql, [loc_id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });
    res.status(200).json(results); // Seedha array bhejo
  });
};

const fetchLoc = (req,res) => {
      const sql = "SELECT * FROM city_list";
      database.query(sql , (err,result) => {
            if (err) {
                  console.error("Database error" , err);
                  return res.status(500).json({success: false, error: err})
            }
            res.status(200).json(result)
      });
};


module.exports = {searchLocation,fetchLoc};