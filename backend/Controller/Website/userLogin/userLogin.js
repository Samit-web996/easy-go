const database = require('../../../Model/dbConnect')

const chkUser = (req,res) => {
      const {mobile} = req.body;
      const sql = "SELECT * FROM users WHERE mobile_no = ?";
      database.query(sql, [mobile], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }

        if (result.length > 0) {
            // User mil gaya -> Old User
            return res.json({ exists: true , user: result[0]});
        } else {
            return res.json({ exists: false });
        }
    });
}

const userDetails = (req, res) => {
      const { uid, full_name, email_id, mobile_no } = req.body;

      const sql = `INSERT INTO users (uid, full_name, email_id, mobile_no) 
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        full_name = VALUES(full_name),
        email_id = VALUES(email_id)`;

        database.query(sql, [uid, full_name, email_id, mobile_no], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: "Database error" });
        }
        
        res.json({ success: true, message: "User authenticated successfully" });
    });
}

module.exports = {chkUser,userDetails}