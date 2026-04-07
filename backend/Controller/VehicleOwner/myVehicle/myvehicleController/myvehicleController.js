const conn = require("../../../../Model/dbConnect");

const getVehicleInfo = (req, res) => {
  const sql = "SELECT * FROM registered_vehicle";
  conn.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching vehicle information:", err);

      res.status(500).json({ error: "Failed to fetch vehicle information" });
    }
    else{res.json(result)}
  });
};

module.exports = getVehicleInfo;
