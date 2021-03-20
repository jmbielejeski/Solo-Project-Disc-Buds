const { actionChannel } = require('@redux-saga/core/effects');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// POST to add hole results to DB
router.post('/', (req, res) => {
  console.log('in hole results router', req.body)

  let queryText = `
    INSERT INTO "course_history"
      ("course_id", "user_id", "hole_score", "hole_index")
    VALUES ($1, $2, $3, $4);
  `
  
  pool.query(queryText, [req.body.courseId, req.user.id, req.body.holeScore, req.body.holeIndex])
    .then(dbRes => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('error adding hole results to DB', error);
      res.sendStatus(500);
    })

});

module.exports = router;
