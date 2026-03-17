const conn = require('../../../Model/dbConnect')
const bcrypt = require('bcrypt')

const signupUser = async (req, res) => {
    const { username, password, mobile_no, email_id } = req.body
    const query = "SELECT * from userreg where username = ?"
    const query1 = "INSERT INTO userreg SET ?"
    const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash(password, salt)
    const data= {
        username,
        password: pass,
        mobile_no,
        email_id
    }

    conn.query(query, [username, email_id], (error, result) => {
        if (result && result.length > 0) {
            return res.send({ message: "Username already EXIST!!!!" })
        }
        conn.query(query1, data, (err, result) => {
            if (err) {
                return res.send({ error: err.message })
            }
            else { res.send({ status: 200, Response: result }) }
        })
    })
}


module.exports = signupUser