const express = require('express');
const router = express.Router();
const {shortController} = require('../controllers/todo.controller')

// POST /api/shortTodos
router.post('/shorttodos',shortController );

module.exports = router