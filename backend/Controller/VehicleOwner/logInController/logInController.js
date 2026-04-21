const conn = require('../../../Model/dbConnect')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

const userLogin = async (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM veh_host_reg WHERE username = ?"; 
    
    conn.query(sql, [username], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = result[0]; 
        const passMatch = await bcrypt.compare(password, user.password);

        if (!passMatch) {
            return res.status(401).json({ error: "Wrong password" });
        }

        return res.status(200).json({ 
            success: true,
            message: "Login successful",
            user: {
                uid: user.uid,
                name: user.username,
                email: user.email_id  
            }
        });
    });
};
module.exports = userLogin;