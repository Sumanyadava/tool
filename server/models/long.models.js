const mongoose = require('mongoose');

const longTaskSchema = new mongoose.Schema({
  plannertitle:String,
  deadline:Date,
  impurg:String,
  milestone:[{task:String}],
  plantext:String
});
const longTodoSchema = new mongoose.Schema({
  longname:String,
  longtasks:[longTaskSchema]
})

const longSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  longTodos:[longTodoSchema]
})

module.exports = mongoose.model('Long', longSchema);