const express = require('express');
const router = express.Router();
const {shortTask ,setPlanner,plannerData,updatePlanner,createShortTodo } = require('../controllers/todo.controller')

// POST /api/shortTodos
router.post('/addtaskshort',shortTask );
router.get('/planner',plannerData)
router.post('/setplanner',setPlanner)
router.put("/updateplanner",updatePlanner)
router.post("/createshorttodo",createShortTodo)

module.exports = router