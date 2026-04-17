const { exist } = require('joi');
const database = require('../../../Model/dbConnect')
// const upload = require("../../VehicleOwner/middleware/multerMiddleware")


const updateKYC = (req, res) => {
    const { uid } = req.params;
    const { full_name, aadhar_no, license_no, current_address, email_id, mobile_no } = req.body; 
    const photoPath = req.file ? req.file.filename : null;
1
    if (email_id) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email_id)) {
            return res.status(400).json({ error: "Invalid email format!" });
        }
    }

    const sql = `
        INSERT INTO user_kyc (uid, full_name,email_id, mobile_no, aadhar_no, license_no, current_address, user_photo)
        VALUES (?, ?, ?, ?,?, ?, ?,?)
        ON DUPLICATE KEY UPDATE 
        full_name = VALUES(full_name),
        mobile_no = VALUES(mobile_no),
        aadhar_no = VALUES(aadhar_no),
        license_no = VALUES(license_no),
        current_address = VALUES(current_address),
        user_photo = VALUES(user_photo),
        verification_status = 'pending'
    `;

    const values = [uid, full_name,email_id,mobile_no, aadhar_no, license_no, current_address, photoPath];

    database.query(sql, values, (err, result) => {
        if (err) {
            console.error("SQL Error:", err); // Backend terminal pe check karo error
            if (err.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
                return res.status(400).json({ error: "Aadhar number must be exactly 12 digits!" });
            }
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: "Aadhar or License already exists!" });
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
}

module.exports = {updateKYC,kycStatus};