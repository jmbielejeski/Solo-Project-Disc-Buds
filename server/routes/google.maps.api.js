const express = require('express');
const axios = require('axios');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = new express.Router();

// GET google maps router
router.get('/:input', rejectUnauthenticated, (req, res) => {

  console.log('req.params', req.params.input)

  axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?', {
    params: {
      input: req.params.input,
      inputtype: 'textquery',
      fields: 'formatted_address,name',
      key: process.env.GOOGLE_MAPS_API_KEY,
    }
  })
    .then((response) => {
      console.log('google maps search results', response.data)
      res.send(response.data);
    })
    .catch((error) => {
      console.log('error in google maps request', error);
    })
});


module.exports = router;