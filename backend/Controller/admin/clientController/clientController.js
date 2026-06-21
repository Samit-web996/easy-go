const database = require('../../../Model/dbConnect');

const verifyOrRejectUser = (req,res) => {
      const sql = "SELECT uk.* , u.full_name , u.email_id , u.mobile_no FROM user_kyc uk LEFT OUTER JOIN users u ON uk.uid = u.uid";
      database.query(sql, (err , result) => {
            if (err) {
                  console.error('Error fetching User data:', err);
            } else {
                  res.json(result);
            }
      });
};

const actionButton = (req,res) => {
      const {uid , verification_status} = req.body;

      const sql = "UPDATE user_kyc SET verification_status = ? WHERE uid = ?"
      database.query(sql , [verification_status,uid.trim()] , (err,resut) => {
            if (err) {
                  console.error(err);
                  return res.status(500).json({success: false, error: err.message})
            }
            res.json({success: true, message: "Status updated"})
      });
};

module.exports = {verifyOrRejectUser,actionButton};