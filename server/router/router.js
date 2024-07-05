const express = require('express');
const router = express.Router();
const userRouter = require('./user.router.js')
const todoRouter = require('./todo.router.js')
const longRouter = require('./long.router.js')




router.use('/auth',(userRouter))
router.use('/todo',(todoRouter))
router.use('/long',(longRouter))


module.exports = router;