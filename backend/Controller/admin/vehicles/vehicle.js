const database = require("../../../Model/dbConnect");

const getVehicleTable = (req, res) => {
  const sql = "SELECT * FROM  vehicle_req ";
  database.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching vehicle information:", err);

      res.status(500).json({ error: "Failed to fetch vehicle information" });
    } else {
      res.json(result);
    }
  });
};

const approveVehicle = async (req, res) => {
  const { registrationNum } = req.body;

  const moveDataQuery = `
        INSERT INTO registered_vehicle  
        (registrationNum, carName, brand, model, seat, features, fuelType, price_per_km, modelYear, status, image, description, email)
        SELECT 
        registrationNum, carName, brand, model, seat, features, fuelType, price_per_km, modelYear, 'AVAILABLE', image, description, email
        FROM vehicle_req
        WHERE registrationNum = ?`;

  const deleteRequestQuery =
    "DELETE FROM vehicle_req WHERE registrationNum = ?";

  try {
    database.query(moveDataQuery, [registrationNum], (err, result) => {
      if (err) {
        console.error("Insert Error:", err);
        return res.status(500).send("Data move karne mein error aaya");
      }
      database.query(deleteRequestQuery, [registrationNum], (delErr) => {
        if (delErr) return res.status(500).send("Delete karne mein error aaya");

        res
          .status(200)
          .json({ message: "Vehicle Approved and Moved successfully!" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const ve_owner_info = (req, res) => {
  const { email } = req.params;
  const sql = "SELECT * FROM ve_owner_info WHERE email = ?";
  database.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" }); 
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    return res.json(result[0]); 
  });
};

const viewVehicleInfo = (req, res) => {
  const sql = "SELECT * FROM  vehicle_req WHERE email = ?";
  const email = req.params.email
  database.query(sql, [email],(err, result) => {
    if (err) {
      console.error("Error fetching vehicle information:", err);

      res.status(500).json({ error: "Failed to fetch vehicle information" });
    } else {
      res.json(result);
    }
  });
};


module.exports = { getVehicleTable, approveVehicle, ve_owner_info,viewVehicleInfo };
