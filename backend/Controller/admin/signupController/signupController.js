const conn = require("../../../Model/dbConnect");
const bcrypt = require("bcrypt");

const signupUser = async (req, res) => {
  const { username, password, mobile_no , email_id } = req.body
  const query1 = "INSERT INTO admin_reg (username , password, mobile_no,email_id ) VALUES  (?)";
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(password, salt);
  const data = [
    username,
    pass,
    mobile_no ,
    email_id,
  ];

  conn.query(query1, [data] ,(err, result) => {
    if (err) {
      console.error(err);
      return res.send({ success: false, error: err.message });
    } else {
      return res.send({ success: true });
    }
  });
};

module.exports = signupUser;
