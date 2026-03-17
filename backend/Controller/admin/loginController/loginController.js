const conn = require('../../../Model/dbConnect')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

const userLogin = async (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT username, password FROM userreg WHERE username = ?"
    conn.query(sql, [username], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" })
        }
        const passMatch = await bcrypt.compare(password, result[0].password)
        if (!passMatch) {
            return res.status(401).json({ error: "Wrong password" })
        }

        return res.status(200).json({ message: "Login successful" })

    })
}

module.exports = userLogin;