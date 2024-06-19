const mongoose = require('mongoose')

const userScherma = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
})