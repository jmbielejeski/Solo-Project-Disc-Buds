const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to search for course
router.get('/search/:query', rejectUnauthenticated, (req, res) => {

  // console.log('in course search router')

  let queryParams = req.params.query;

  queryParams = '%'+queryParams+'%';

  // console.log('queryParams', queryParams)

  const queryText = `
    SELECT * FROM "courses"
    WHERE course_name ILIKE $1;
  `
  pool.query(queryText, [queryParams])
    .then((dbRes) => {
      res.send(dbRes.rows)
      //console.log('course router dbRes', dbRes.rows)
    })
    .catch((error) => {
      console.log('error in search', error);
      res.sendStatus(500);
    })

});

// GET to grab friends who have played course
router.get('/selected', rejectUnauthenticated, (req, res) => {
  // console.log('in course GET router for course friend list', req.params.course)

  const queryText =`
  SELECT "user".username, "user".id, count("user".username) FROM "course_history"
  JOIN "friends" ON "course_history".user_id = "friends".user_two
  JOIN "user" ON "friends".user_two = "user".id
  WHERE "friends".user_one = $1
  GROUP BY "user".id;`

  pool.query(queryText, [req.user.id])
    .then((dbRes) => {
      // console.log('selected course friends', dbRes.rows)
      res.send(dbRes.rows);
    })
    .catch((error) => {
      console.log('error getting friends who played course', error);
      res.sendStatus(500);
    })
})

// add a course POST
router.post('/', rejectUnauthenticated, (req, res) => {
  //console.log('in addCourse POST router')  

  const queryText = `
    INSERT INTO "courses"
      ("course_name", "hole_count", "address", "city", "state", "zip_code")
    VALUES ($1, $2, $3, $4, $5, $6);
  `

  pool.query(queryText, [req.body.course_name, req.body.hole_count, req.body.address, req.body.city, req.body.state, req.body.zip_code])
  .then(dbRes => {
    console.log('course added');
    res.sendStatus(500);
  })
  .catch(error => {
    console.log('error adding course', error);
    res.sendStatus(500);
  })
});

module.exports = router;
