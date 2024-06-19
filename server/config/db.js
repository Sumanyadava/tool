const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const database_name = "test"


// write 127.0.0.1 instead of localhost - dont know why ?
const conntectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI+database_name)
    console.log("connected db")

  } catch (error) {
    console.log("error at db", error)
  }
}
module.exports =  conntectDB 