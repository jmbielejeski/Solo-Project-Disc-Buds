const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to grab friend course history
router.post('/', (req, res) => {
  console.log('in friendCourse router', req.body);

  

});

module.exports = router;
