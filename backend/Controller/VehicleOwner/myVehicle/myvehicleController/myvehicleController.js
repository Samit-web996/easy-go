const conn = require("../../../../Model/dbConnect");

const getVehicleInfo = (req, res) => {
  const sql = "SELECT v.*, c.city_name FROM registered_vehicle v JOIN city_list c ON v.loc_id = c.loc_id";
  conn.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching vehicle information:", err);

      res.status(500).json({ error: "Failed to fetch vehicle information" });
    }
    else{res.json(result)}
  });
};



module.exports = getVehicleInfo;
