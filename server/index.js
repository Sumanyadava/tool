const express = require("express")
const dotenv = require('dotenv')
const conntectDB = require('./config/db.js')
const router = require('./router/router.js');

const User = require('./models/user.models.js')
const ShortTodo = require('./models/shortTodo.models.js');


dotenv.config()

const app = express()
app.use(express.json());
conntectDB()

const PORT= process.env.PORT || 4000;




//api register
app.use('/api',router)










app.listen(PORT , () => console.log(`server is running at ${PORT}`))