const express = require('express')
const app = express();
app.use(express.json())
const cors = require('cors')
app.use(cors())
const signupRouter = require('./Route/Admin-Route/signuRoute/signupRoute')
app.use('/', signupRouter)
const loginRouter = require('./Route/Admin-Route/loginRoute/loginRoute')
app.use('/', loginRouter)
const employeeRouter = require("./Route/Admin-Route/employeeRoute/employeeRoutea")
app.use('/', employeeRouter)
const modalRouter = require('./Route/Admin-Route/employeeRoute/modalRoute')
app.use('/', modalRouter)


port = 3006;


app.listen(port, () => {
    console.log(`Server is running on port ${port} successfully`);
});