const express = require('express');
const { createLongTodo,allLongTodo,addLongTask, editTodo,deleteTodo,editLongTask } = require('../controllers/long.controller');
const router = express.Router();

router.get('/setlong',allLongTodo)
router.post('/add',createLongTodo)
router.post('/edit',editTodo)
router.delete('/deletetodo', deleteTodo)
router.post('/addtask',addLongTask)
router.put('/editlongtask', editLongTask);

module.exports = router  