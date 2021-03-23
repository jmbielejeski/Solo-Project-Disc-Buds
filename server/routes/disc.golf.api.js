const express = require('express');
const axios = require('axios');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = new express.Router();

// POST to login session with PDGA API
router.post('/', rejectUnauthenticated, (req, res) => {
  
  axios.post('https://api.pdga.com/services/json/user/login', {
    data: {
      username: process.env.PDGA_API_USERNAME,
      password: process.env.PDGA_API_PASSWORD
    },
    headers: {
      'content-type': 'application/json'
    }
  })
  .then((response) => {
    console.log('logged in to API')
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('error logging in api');
  })
});

// GET PDGA Search router
router.get('/:input', rejectUnauthenticated, (req, res) => {

  console.log('req.params', req.params.input)

  axios.get('https://api.pdga.com/services/json/course', {
    params: {
      course_name: req.params.input,
    },
    headers: {
      'Cookie': session_name= process.env.PDGA_SESSION_COOKIE
    }
  })
    .then((response) => {
      console.log('login to PDGA successful', response.data.courses)
      res.send(response.data.courses);
    })
    .catch((error) => {
      console.log('error in PDGA login', error);
    })
});


module.exports = router;