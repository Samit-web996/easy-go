// loginController.js ko wapas aise normal kar do:
const conn = require("../../../Model/dbConnect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT username, password FROM admin_reg WHERE username = ?";
  
  conn.query(sql, [username], async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: "User not found" });

    const user = result[0];
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) return res.status(401).json({ error: "Wrong password" });

    const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: "lax" });
    return res.json({ status: "Success", message: "Login successful", token });
  });
};

module.exports = userLogin;