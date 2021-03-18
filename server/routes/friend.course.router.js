const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to grab friend course history
router.get('/', (req, res) => {
  console.log('in friendCourse router');
});

module.exports = router;
