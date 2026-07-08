const conn = require("../../../../Model/dbConnect");

const getVehicleInfo = (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: "Owner email is required" });
  }
  // console.log("Fetching vehicles for:", email);
  // const sql = "SELECT v.*, c.city_name FROM registered_vehicle v JOIN city_list c ON v.loc_id = c.loc_id";
  const sql = "SELECT * FROM registered_vehicle WHERE email = ?";

  conn.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Error fetching vehicle information:", err);

      res.status(500).json({ error: "Failed to fetch vehicle information" });
    } else {
      res.json(result);
    }
  });
};

module.exports = getVehicleInfo;
