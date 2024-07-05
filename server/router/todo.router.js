const express = require('express');
const router = express.Router();
const {shortTask ,createShortTodo,allTodo,getTasks,deleteTask,deleteTodo,editTodo,editTask  } = require('../controllers/todo.controller')

// POST /api/shortTodos
router.get("/alltodo",allTodo)
router.post("/createshorttodo",createShortTodo)
router.put('/edit', editTodo);
router.delete('/delete', deleteTodo);


router.get("/alltask",getTasks)
router.post('/addtaskshort',shortTask );
router.put('/edittask', editTask);
router.delete('/tasks/:userId/:todoId/:taskId', deleteTask);

  
module.exports = router