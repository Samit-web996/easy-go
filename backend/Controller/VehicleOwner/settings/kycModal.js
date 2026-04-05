const database = require('../../../Model/dbConnect')

const kycModal = (req, res) => {
      const {ownerName,aadhar,email,address,mobile} = req.body;
      const profile_img = req.file ? req.file.filename : null;
      const sql = "INSERT INTO ve_owner_info(ownerName,aadhar,email,mobile,address,profile_img) VALUES (?,?,?,?,?,?)";
      const values = [ownerName,aadhar,email,mobile,address,profile_img];

      database.query(sql,values,(err,result) => {
            if(err){
                  console.log(err);
                  return res.status(500).json({message : "Database Error"})
            }
            else{res.status(200).json({message : "KYC Update successfully"})}
      });
};

module.exports = kycModal;
