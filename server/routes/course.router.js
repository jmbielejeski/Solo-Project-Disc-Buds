const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to search for course
router.get('/:search', (req, res) => {

  // console.log('in course search router')

  let queryParams = req.params.search;

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

// GET route for selecting course
// router.get('/:id', (req, res) => {
//   console.log('in select course GET')
  
  // let queryParams = req.params.id;

  // console.log('params are', req.params)

  // let queryText = `
  //   SELECT * FROM "courses"
  //   WHERE id = $1;
  // `

  // pool.query(queryText, [queryParams])
  //   .then((dbRes) => {
  //     console.log('courseSelect GET', dbRes.rows);

  //     res.send(dbRes.rows)
  //   })
  //   .catch((error) => {
  //     console.log('error in select course GET route', error);
  //     res.sendStatus(500);
  //   })

// })

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
