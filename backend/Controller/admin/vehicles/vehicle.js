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

  // const approveVehicle = async (req, res) => {
  //   const { registrationNum } = req.body;

  //   const moveDataQuery = `
  //         INSERT INTO registered_vehicle  
  //         (owner_name,registrationNum,loc_id, carName, brand, model, seat, features, fuelType, pricePerDay, modelYear, status, image, description, email)
  //         SELECT 
  //         owner_name,registrationNum,loc_id, carName, brand, model, seat, features, fuelType, pricePerDay, modelYear, 'AVAILABLE', image, description, email
  //         FROM vehicle_req
  //         WHERE registrationNum = ?`;

  //   const deleteRequestQuery =
  //     "DELETE FROM vehicle_req WHERE registrationNum = ?";

  //   try {
  //     database.query(moveDataQuery, [registrationNum], (err, result) => {
  //       if (err) {
  //         console.error("Insert Error:", err);
  //         return res.status(500).send("Data move karne mein error aaya");
  //       }
  //       database.query(deleteRequestQuery, [registrationNum], (delErr) => {
  //         if (delErr) return res.status(500).send("Delete karne mein error aaya");

  //         res
  //           .status(200)
  //           .json({ message: "Vehicle Approved and Moved successfully!" });
  //       });
  //     });
  //   } catch (error) {
  //     res.status(500).json({ message: "Server Error" });
  //   }
  // };


const approveVehicle = async (req, res) => {
  const { registrationNum, status } = req.body; 

  const moveDataQuery = `
        INSERT INTO registered_vehicle  
        (owner_name, registrationNum, loc_id, carName, brand, model, seat, features, fuelType, pricePerDay, modelYear, status, image, description, email)
        SELECT 
        owner_name, registrationNum, loc_id, carName, brand, model, seat, features, fuelType, pricePerDay, modelYear, 'AVAILABLE', image, description, email
        FROM vehicle_req
        WHERE registrationNum = ?`;

  const deleteRequestQuery = "DELETE FROM vehicle_req WHERE registrationNum = ?";

  try {
    if (status === 'reject') {
      database.query(deleteRequestQuery, [registrationNum], (delErr, result) => {
        if (delErr) return res.status(500).json({ success: false, message: "Delete error" });
        return res.status(200).json({ success: true, message: "Vehicle Request Rejected and Deleted!" });
      });
    } 
    
    else if (status === 'approve') {
      database.query(moveDataQuery, [registrationNum], (err, result) => {
        if (err) {
          console.error("Insert Error:", err);
          return res.status(500).json({ success: false, message: "Data move karne mein error aaya" });
        }
        database.query(deleteRequestQuery, [registrationNum], (delErr) => {
          if (delErr) return res.status(500).json({ success: false, message: "Delete karne mein error aaya" });
          res.status(200).json({ success: true, message: "Vehicle Approved and Moved successfully!" });
        });
      });
    }

    // 3. Status missing case
    else {
      return res.status(400).json({ success: false, message: "Invalid status provided" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const ve_host_info = (req, res) => {
  const { email } = req.params;
  const sql = "SELECT * FROM ve_host_info WHERE email = ?";
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
  const sql = "SELECT vr.*, cl.city_name FROM vehicle_req vr JOIN city_list cl ON vr.loc_id = cl.loc_id WHERE vr.email = ?";
  const email = req.params.email
  database.query(sql, [email],(err, result) => {
    if (err) {
      console.error("Error fetching vehicle information:", err);

      res.status(500).json({ error: "Failed to fetch vehicle information" });
    } else {
      // console.log("Hello")
      res.json(result);
    }
  });
};



const updateVehicleStatus = (req, res) => {
  const { carid, status } = req.body;

  const sql = "UPDATE registered_vehicle SET status = ? WHERE carid = ?";

  database.query(sql, [status, carid], (err, result) => {
    if (err) {
      console.error("Status update error:", err);
      return res.status(500).json({ error: "Failed to update status" });
    }

    res.json({ message: "Status updated successfully" });
  });
};

const carCard = (req,res) => {
    const sql = "SELECT v.*, c.city_name FROM registered_vehicle v JOIN city_list c ON v.loc_id = c.loc_id";

  database.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching vehicle information:", err);

      res.status(500).json({ error: "Failed to fetch vehicle information" });
    } else {
      res.json(result);
    }
  });
}

module.exports = { getVehicleTable, approveVehicle, ve_host_info,viewVehicleInfo,updateVehicleStatus,carCard };
