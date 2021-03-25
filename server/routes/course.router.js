const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to search for course
router.get('/search/:query', rejectUnauthenticated, (req, res) => {

  let queryParams = req.params.query;

  queryParams = '%'+queryParams+'%';

  const queryText = `
    SELECT * FROM "courses"
    WHERE course_name ILIKE $1;
  `
  pool.query(queryText, [queryParams])
    .then((dbRes) => {
      res.send(dbRes.rows)
    })
    .catch((error) => {
      console.log('error in search', error);
      res.sendStatus(500);
    })

});

// GET to grab friends who have played course
router.get('/selected/:courseId', rejectUnauthenticated, (req, res) => {

  const queryText =`
  SELECT "user".username, "user".id, count("user".username) FROM "course_history"
  JOIN "friends" ON "course_history".user_id = "friends".user_two
  JOIN "user" ON "friends".user_two = "user".id
  WHERE "friends".user_one = $1
  AND "course_history".course_id = $2
  AND "user".id != $1
  GROUP BY "user".id;`

  pool.query(queryText, [req.user.id, req.params.courseId])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((error) => {
      console.log('error getting friends who played course', error);
      res.sendStatus(500);
    })
})


// GET to grab random players who have played course
router.get('/random/:courseId', rejectUnauthenticated, (req, res) => {

  const queryText =`
  SELECT "user".username, "user".id, count("user".username) FROM "course_history"
  JOIN "user" ON "course_history".user_id = "user".id
  WHERE "course_history".course_id = $2
  AND "user".id != $1
  GROUP BY "user".id;`

  pool.query(queryText, [req.user.id, req.params.courseId])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((error) => {
      console.log('error getting friends who played course', error);
      res.sendStatus(500);
    })
})

module.exports = router;
