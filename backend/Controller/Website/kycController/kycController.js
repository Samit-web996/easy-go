const { exist } = require('joi');
const database = require('../../../Model/dbConnect')
// const upload = require("../../VehicleOwner/middleware/multerMiddleware")


const updateKYC = (req, res) => {
    const { uid } = req.params;
    const { aadhar_no, license_no, current_address } = req.body; 
    const photoPath = req.file ? req.file.filename : null;

    const sql = `
        INSERT INTO user_kyc (uid, aadhar_no, license_no, current_address, user_photo)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        aadhar_no = VALUES(aadhar_no),
        license_no = VALUES(license_no),
        current_address = VALUES(current_address),
        user_photo = IFNULL(VALUES(user_photo), user_photo), 
        verification_status = 'pending'
    `;

    const values = [uid, aadhar_no, license_no, current_address, photoPath];

    database.query(sql, values, (err, result) => {
        if (err) {
            console.error("SQL Error:", err); 
            
            // Check Constraint Error (Aadhar/License format)
            if (err.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
                return res.status(400).json({ error: "Invalid Aadhar or License format!" });
            }
            
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: "This Aadhar or License is already registered!" });
            }

            return res.status(500).json({ error: "Database error during KYC" });
        }
        res.json({ success: true, message: "KYC details submitted for verification!" });
    });
};

const kycStatus = (req, res) => {
    const {uid} = req.params;
    const sql = "SELECT verification_status FROM user_kyc WHERE uid = ?";
    database.query(sql,[uid], (err,result) => {
        if (err) return res.status(500).json({ error: "Database error"});
        if (result.length > 0) {
            res.json({exist: true, status: result[0].verification_status.trim() });
        }else {
            res.json({exist: false});
        }
    })
};

module.exports = {updateKYC,kycStatus};