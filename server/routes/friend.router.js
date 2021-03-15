const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to search for friends
router.get('/', (req, res) => {

  queryText = `
    SELECT * FROM "user"
  `
  pool.query(queryText)
    .then((dbRes) => {
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
