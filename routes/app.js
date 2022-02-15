const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const requestEndpoint = "https://serpapi.com/search.json?engine=google_scholar&q=Recommended%20system&api_key=6209d58e772efca376c83704cddcc43b589addb53e6eea35b69347baf1188721#";

router.get('/getData', async (req, res) => {
  const fetchOptions = {
      method: 'GET'
  }
  const response = await fetch(requestEndpoint, fetchOptions);
  const jsonResponse = await response.json();
  res.json(jsonResponse);
});



module.exports = router
