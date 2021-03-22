const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to grab friend course history
router.get('/match', rejectUnauthenticated, (req, res) => {
  // console.log('in friendCourse router', req.query.friendId);
  
  let courseId = req.query.courseId;
  let friendId = req.query.friendId;
  let holeCount = req.query.holeCount;

  const queryText = `
  SELECT * FROM "course_history"
  WHERE user_id = $1 AND course_id = $2
  LIMIT $3
  `

  pool.query(queryText, [friendId, courseId, holeCount])
    .then((dbRes) => {
      // console.log('courseHistory', dbRes.rows);
      res.send(dbRes.rows);
    })
    .catch((error) => {
      console.log('error getting friend match history', error);
      res.sendStatus(500);
    })

});

// DELETE users course history
router.delete('/', rejectUnauthenticated, (req, res) => {
  console.log('deleting profile');

  let queryText = `
    DELETE FROM "course_history"
    WHERE user_id = $1;`


  pool.query(queryText, [req.user.id])
    .then(dbRes => {
      console.log('user profile course history deleted')
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('error deleting profile course history', error);
      res.sendStatus(500); 
    })


})

module.exports = router;
