const express = require('express');
const { createLongTodo } = require('../controllers/planner.controller');
const router = express.Router();

router.post('/add',createLongTodo)
module.exports = router