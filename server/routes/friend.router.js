const express = require('express');
const { query } = require('../modules/pool');
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
      res.send(dbRes.rows)
    })
    .catch((error) => {
      console.log('error in search', error);
      res.sendStatus(500);
    })

});

// POST route to add friend
router.post('/', (req, res) => {
  // POST route code here

  console.log('req.body', req.body);

  let queryText = `
    INSERT INTO "friends" ("user_one", "user_two")
      VALUES ($1, $2);
  `
  pool.query(queryText, [req.user.id, req.body.userId])
    .then(dbRes => {
      console.log('added friend');
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('error adding friend', error);
      res.sendStatus(500);
    })

});

module.exports = router;
