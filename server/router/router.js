const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

router.get('/about', (req, res) => {
  res.send('About Page');
});

module.exports = router;