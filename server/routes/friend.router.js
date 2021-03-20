const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { query } = require('../modules/pool');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to search for friends
router.get('/:search', rejectUnauthenticated, (req, res) => {

  // console.log('GET Friend route', req.params.search)

  let queryParams = req.params.search;

  queryParams = '%'+queryParams+'%';

  // console.log('queryParams', queryParams)

  const queryText = `
    SELECT * FROM "user"
    WHERE username ILIKE $1 AND id != $2;
  `
  pool.query(queryText, [queryParams, req.user.id])
    .then((dbRes) => {
      res.send(dbRes.rows)
    })
    .catch((error) => {
      console.log('error in search', error);
      res.sendStatus(500);
    })

});

router.get('/', rejectUnauthenticated, (req, res) => {

  //console.log('in friend GET')

  const queryText = `
    SELECT "user".username, "user".id FROM "user"
      JOIN "friends" ON "user".id = "user_two"
      WHERE "user_one" = $1;
  `
  pool.query(queryText, [req.user.id])
    .then((dbRes) => {
      res.send(dbRes.rows)
    })
    .catch((error) => {
      console.log('error getting friend data from DB', error);
      res.sendStatus(500);
    })

})

router.get('/details/:id', rejectUnauthenticated, (req, res) => {
  // console.log('in friend details router', req.params.id);

  const queryText = `
  SELECT "user".username, "user".id FROM "user"
  JOIN "friends" ON "user".id = "user_two"
  WHERE "user_one" = $1 AND "user_two" = $2;
  `

  pool.query(queryText, [req.user.id, req.params.id])
    .then((dbRes) => {
      res.send(dbRes.rows)
    })
    .catch((error) => {
      console.log('error getting friend details in router', error);
      res.sendStatus(500);
    })

})

// POST route to add friend
router.post('/', rejectUnauthenticated,  (req, res) => {
  // POST route code here

  // console.log('req.body', req.body);

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

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('router delete req.params', req.params.id);

  const queryText = `
  DELETE FROM "friends"
  WHERE user_one = $1 AND user_two = $2;
  `

  pool.query(queryText, [req.user.id, req.params.id])
    .then(dbRes => {
      console.log('friend deleted');
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('error deleting friend');
      res.sendStatus(500)
    })

})

module.exports = router;
