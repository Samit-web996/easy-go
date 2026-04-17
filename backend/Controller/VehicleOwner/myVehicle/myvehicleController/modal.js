const { exist } = require("joi");
const database = require("../../../../Model/dbConnect");

const addVehicle = (req, res) => {
  const {
    owner_name,
    email,
    registrationNum,
    carName,
    brand,
    model,
    seat,
    features,
    fuelType,
    price_per_km,
    modelYear,
    description,
  } = req.body;
  const image = req.file ? req.file.filename : null;
  const sql =
    "INSERT INTO vehicle_req(owner_name,email,registrationNum , carName , brand , model , seat , features , fuelType ,price_per_km , modelYear ,image , description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
  const values = [
    owner_name,
    email,
    registrationNum,
    carName,
    brand,
    model,
    seat,
    features,
    fuelType,
    price_per_km,
    modelYear,
    image,
    description,
  ];

  database.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database Error" });
    } else {
      res.status(200).json({ message: "Vehicle added successfully" });
    }
  });
};

const chkEmailVOwner = (req, res) => {
  const { email } = req.params;
  const sql = "SELECT * FROM ve_host_info WHERE email = ?";
  database.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(403).json({
        exist: false,
        message: "KYC_REQUIRED",
        error: "Fistly complete your KYC before send your vehicle request.",
      });
    }

    res.json({ exist: true, message: "Owner verified successfully" });
  });
};

const getFuelType = (req, res) => {
  const sql = "SELECT * FROM fuel_type";
  database.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database Error" });
    }
    res.send(result);
  });
};

module.exports = { addVehicle, chkEmailVOwner, getFuelType };
