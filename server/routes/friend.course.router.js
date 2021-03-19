const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to grab friend course history
router.post('/', (req, res) => {
  console.log('in friendCourse router', req.body);

  let friendId = req.body.friendId;
  let courseId = req.body.courseId;
  let holeCount = req.body.holeCount;

  const queryText = `
  SELECT * FROM "course_history"
  WHERE user_id = $1 AND course_id = $2
  LIMIT $3
  `

  pool.query(queryText, [friendId, courseId, holeCount])
    .then((dbRes) => {
      console.log('courseHistory', dbRes.rows);
      res.send(dbRes.rows);
    })
    .catch((error) => {
      console.log('error getting friend match history', error);
      res.sendStatus(500);
    })

});

module.exports = router;
