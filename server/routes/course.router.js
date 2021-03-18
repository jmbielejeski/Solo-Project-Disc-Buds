const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to search for course
router.get('/search/:query', (req, res) => {

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
router.get('/selected', (req, res) => {
  console.log('in course GET router for course friend list')
})

// add a course POST
router.post('/', (req, res) => {
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
