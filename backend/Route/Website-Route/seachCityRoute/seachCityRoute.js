const express = require('express');
const searchCityRouter = express.Router();
const {searchLocation,fetchLoc} = require('../../../Controller/Website/seachCity/seachCity');
 
// searchCityRouter.post('/seach-city' , searchLocation);
// Method ko POST se GET karein aur path ko frontend se match karein
searchCityRouter.get('/api/search', searchLocation);
searchCityRouter.get('/api/locations' , fetchLoc)

module.exports = searchCityRouter;