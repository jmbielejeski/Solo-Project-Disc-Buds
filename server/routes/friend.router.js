const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to search for friends
router.get('/:search', (req, res) => {

  // console.log('GET Friend route', req.params.search)

  let queryParams = req.params.search;

  queryParams = '%'+queryParams+'%';

  // console.log('queryParams', queryParams)

  queryText = `
    SELECT * FROM "user"
    WHERE username LIKE $1;
  `
  pool.query(queryText, [queryParams])
    .then((dbRes) => {
      console.log('dbRes', dbRes);
      res.send(dbRes.rows)
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
