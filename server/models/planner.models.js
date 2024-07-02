const mongoose = require('mongoose');

const plannerSchema = new mongoose.Schema({
  user:String,
  plannertitle:String,
  deadline:Date,
  impurg:["imp","urg"],
  milestone:[{task:String}],
  plantext:String
})

module.exports = mongoose.model('Planner', plannerSchema);