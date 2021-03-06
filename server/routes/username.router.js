const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// PUT route to change username
router.put('/', rejectUnauthenticated, (req, res) => {

  const queryText = `
    UPDATE "user"
      SET "username" = $1
      WHERE "user".id = $2;`
  
  pool.query(queryText, [req.body.newUserName, req.user.id])
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in router changing username', error);
      res.sendStatus(500);
    })    

});


module.exports = router;
