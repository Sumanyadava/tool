const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  tname: String,
  iscompleted: { type: Boolean, default: false }
});

const shortTodoSchema = new mongoose.Schema({
  shortname: String,
  tasks: [taskSchema]
});

const sTodoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  shortTodos: [shortTodoSchema]
}, {
  timestamps: true
});


module.exports = mongoose.model('ShortTodo', sTodoSchema);