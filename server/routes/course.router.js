const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to search for course
router.get('/:search', (req, res) => {

  console.log('in course search router', req.params)

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
      console.log('course router dbRes', dbRes.rows)
    })
    .catch((error) => {
      console.log('error in search', error);
      res.sendStatus(500);
    })

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
