const { actionChannel } = require('@redux-saga/core/effects');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



router.get('/:friendId', (req, res) => {
  console.log('in match results router GET', req.params.friendId)

  let queryText = `
    SELECT user_one_score, user_two_score FROM "match_results"
    WHERE user_one = $1 AND user_two = $2;
  `

  pool.query(queryText, [req.user.id, req.params.friendId])
    .then((dbRes) => {
      console.log('match results', dbRes.rows)
      res.send(dbRes.rows)
      //console.log('course router dbRes', dbRes.rows)
    })
    .catch((error) => {
      console.log('error in match results', error);
      res.sendStatus(500);
    })
});

router.post('/', rejectUnauthenticated, (req, res) => {
  
  console.log('match results router post payload', req.body)

  let queryText = `
    INSERT INTO "match_results" ("user_one", "user_two", "user_one_score", "user_two_score")
      VALUES ($1, $2, $3, $4);
  `
  pool.query(queryText, [req.user.id, req.body.friendId, req.body.yourScore, req.body.friendScore])
    .then(dbRes => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('error adding match results to DB', error);
      res.sendStatus(500);
    })
});

module.exports = router;
