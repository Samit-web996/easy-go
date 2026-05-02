const { exist } = require("joi");
const database = require("../../../../Model/dbConnect");

const addVehicle = (req, res) => {
  const {
    owner_name,
    email,
    registrationNum,
    loc_id,
    carName,
    brand,
    model,
    seat,
    features,
    fuelType,
    pricePerDay,
    modelYear,
    description,
  } = req.body;
  
  const image = req.file ? req.file.filename : null;

  const chkRegExist = "SELECT * FROM registered_vehicle WHERE registrationNum = ?";

  // 1. Pehle Duplicate Check karo
  database.query(chkRegExist, [registrationNum], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error during check" });
    }

    // 2. Agar duplicate mil gaya toh yahi se response bhej kar ruk jao
    if (result.length > 0) {
      return res.status(400).json({
        success: false,
        message: "This vehicle is already registered",
      });
    }

    // 3. Agar duplicate nahi hai, tabhi INSERT query chalao (Iske andar)
    const sql =
      "INSERT INTO vehicle_req(owner_name,email,registrationNum,loc_id , carName , brand , model , seat , features , fuelType ,pricePerDay , modelYear ,image , description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    
    const values = [
      owner_name,
      email,
      registrationNum,
      loc_id,
      carName,
      brand,
      model,
      seat,
      features,
      fuelType,
      pricePerDay,
      modelYear,
      image,
      description,
    ];

    database.query(sql, values, (err, insertResult) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Database Error during insertion" });
      } else {
        // 4. Final Success Response
        return res.status(200).json({ success: true, message: "Vehicle added successfully" });
      }
    });
  });
};

// const addVehicle = (req, res) => {
//   const {
//     owner_name,
//     email,
//     registrationNum,
//     carName,
//     brand,
//     model,
//     seat,
//     features,
//     fuelType,
//     price_per_km,
//     modelYear,
//     description,
//   } = req.body;
//   const image = req.file ? req.file.filename : null;

//   const  chkRegExist = "SELECT * FROM registered_vehicle WHERE registrationNum = ?";

//   database.query(chkRegExist, [registrationNum] , (err,result) => {
//     if (err) return res.status(500).json({ success: false , message: "database err"});

//     if(result.length > 0) {
//       return res.status(400).json({
//         success: false,
//         message: "This vehicle is already registered"
//       });
//     }
//   })

//   const sql =
//     "INSERT INTO vehicle_req(owner_name,email,registrationNum , carName , brand , model , seat , features , fuelType ,price_per_km , modelYear ,image , description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
//   const values = [
//     owner_name,
//     email,
//     registrationNum,
//     carName,
//     brand,
//     model,
//     seat,
//     features,
//     fuelType,
//     price_per_km,
//     modelYear,
//     image,
//     description,
//   ];

//   database.query(sql, values, (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ message: "Database Error" });
//     } else {
//       res.status(200).json({ message: "Vehicle added successfully" });
//     }
//   });
// };

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

const cityList = (req,res) => {
  const sql = "SELECT * FROM city_list"
  database.query(sql , (err,result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({message: "Database Error"})
    }
    res.send(result)
  });
};

module.exports = { addVehicle, chkEmailVOwner, getFuelType,cityList };
