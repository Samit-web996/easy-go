const { exist } = require("joi");
const database = require("../../../../Model/dbConnect");
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const addVehicle = async (req, res) => {
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

  const chkRegExist = "SELECT * FROM registered_vehicle WHERE registrationNum = ?";
  database.query(chkRegExist, [registrationNum], async (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error during check" });
    }

    if (result.length > 0) {
      if (req.file && req.file.filename) {
        try {
          await cloudinary.uploader.destroy(req.file.filename);
        } catch (cloudErr) {
          console.error("Cloudinary asset cleanup failed:", cloudErr);
        }
      }
      return res.status(400).json({
        success: false,
        message: "This vehicle is already registered",
      });
    }

    let finalImageUrl = null;
    if (req.file) {
      finalImageUrl = req.file.path || req.file.secure_url; 
    }

    const sql =
      "INSERT INTO vehicle_req(owner_name, email, registrationNum, loc_id, carName, brand, model, seat, features, fuelType, pricePerDay, modelYear, image, description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    
    const values = [
      owner_name,
      email,
      registrationNum,
      loc_id,
      carName,
      brand,
      model,
      seat ? parseInt(seat, 10) : null,
      features,
      fuelType,
      pricePerDay ? parseFloat(pricePerDay) : null,
      modelYear,
      finalImageUrl, 
      description,
    ];

    database.query(sql, values, async (err, insertResult) => {
      if (err) {
        console.error("Database Insertion Error:", err);
        
        if (req.file && req.file.filename) {
          try {
            await cloudinary.uploader.destroy(req.file.filename);
          } catch (cloudErr) {
            console.error("Cloudinary fallback cleanup failed:", cloudErr);
          }
        }
        return res.status(500).json({ success: false, message: "Database Error during insertion" });
      }

      return res.status(200).json({ success: true, message: "Vehicle added successfully" });
    });
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
