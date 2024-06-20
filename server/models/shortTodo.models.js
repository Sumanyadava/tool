const mongoose = require('mongoose');
const userModels = require('./user.models');

const sTodoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  task:[{
    tname:String,
    iscompleted:{type:Boolean,default:false}}]
},{
  timestamps:true
})

module.exports = mongoose.model('shortTodo', sTodoSchema);