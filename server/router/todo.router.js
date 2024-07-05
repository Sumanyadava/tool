const express = require('express');
const router = express.Router();
const {shortTask ,setPlanner,plannerData,updatePlanner,createShortTodo,allTodo,getTasks,deleteTask,deleteTodo,editTodo  } = require('../controllers/todo.controller')

// POST /api/shortTodos
router.post('/addtaskshort',shortTask );
router.post("/createshorttodo",createShortTodo)
router.get("/alltodo",allTodo)
router.get("/alltask",getTasks)
router.delete('/tasks/:userId/:todoId/:taskId', deleteTask);
router.delete('/delete', deleteTodo);
router.put('/edit', editTodo);

  
module.exports = router