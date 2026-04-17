const express = require('express');
const carCategories = express.Router();
const {getCarCategories,getCarInfo,vehRating} = require('../../../Controller/Website/carCategories/carCategories');

carCategories.get('/vehicles' , getCarCategories);
carCategories.get('/vehicles/:carid', getCarInfo);
carCategories.get('/vehicle-rating/:carid' ,vehRating)

module.exports = carCategories;