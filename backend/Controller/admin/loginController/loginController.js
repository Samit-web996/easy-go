const conn = require("../../../Model/dbConnect"); // Make sure this is using mysql2/promise
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Checking database for user:", username); // Debugging log

    const sql = "SELECT username, password FROM admin_reg WHERE username = ?";
    const [rows] = await conn.execute(sql, [username]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
    });

    return res.json({
      status: "Success",
      message: "Login successful",
      token,
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: "Database error, please try again" });
  }
};

module.exports = userLogin;