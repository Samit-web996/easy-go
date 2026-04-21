const database = require('../../../Model/dbConnect')

const kycModal = (req, res) => {
      const {ownerName,aadhar,email,address} = req.body;
      const profile_img = req.file ? req.file.filename : null;
      const sql = "INSERT INTO ve_host_info(ownerName,aadhar,email,address,profile_img) VALUES (?,?,?,?,?)";
      const values = [ownerName,aadhar,email,address,profile_img];

      database.query(sql,values,(err,result) => {
            if(err){
                  console.log(err);
                  return res.status(500).json({message : "Database Error"})
            }
            else{res.status(200).json({message : "KYC Update successfully"})}
      });
};

module.exports = kycModal;
