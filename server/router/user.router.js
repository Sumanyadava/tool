const express = require('express');
const router = express.Router();
const { hello, register, login } = require('../controllers/user.controller');

router.get('/hello',hello)
router.post('/register',register)
router.post('/login',login)

module.exports = router 