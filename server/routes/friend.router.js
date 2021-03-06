const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { query } = require('../modules/pool');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to search for friends
router.get('/:search', rejectUnauthenticated, (req, res) => {

  let queryParams = req.params.search;

  queryParams = '%'+queryParams+'%';

  const queryText = `
    SELECT "user".id, "user".username FROM "user"
    WHERE "user".username ILIKE $1 
    AND "user".id != $2
    AND NOT EXISTS (
      SELECT 1 FROM "friends"
      WHERE user_two = "user".id
      AND user_one = $2); 
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

// route to get friend details
router.get('/details/:id', rejectUnauthenticated, (req, res) => {

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

router.delete('/profile/friendships', rejectUnauthenticated, (req, res) => {

  let queryText = `
    DELETE FROM "friends"
    WHERE user_one = $1 OR user_two=$1;`

    pool.query(queryText, [req.user.id])
    .then(dbRes => {
      console.log('user friendships deleted')
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('error deleting friendships', error);
      res.sendStatus(500); 
    })

})

module.exports = router;
