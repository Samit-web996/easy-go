// const env = require('dotenv');
// env.config()
const express = require('express')
const app = express();
app.use(express.json())
const cors = require('cors')
app.use(cors())
const signupRouter = require('./Route/signuRoute/signupRoute')
app.use('/', signupRouter)
const loginRouter = require('./Route/loginRoute/loginRoute')
app.use('/', loginRouter)
port = 3006


app.listen(port, () => {
    console.log("Server is running successfully")
});