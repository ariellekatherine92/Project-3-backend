// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');

//models
const { Restaurant } = require('../models');

//controllers
const index = async (req, res) => {
    console.log('inside of /api/restaurant');
    try {
        const allRestaurants = await Restaurant.find({});
        
        res.json({ restaurant: allRestaurants });
    } catch (error) {
        console.log('Error inside of /api/restaurant');
        console.log(error);
        return res.status(400).json({ message: 'Restaurants not found... Please try again.' });
    }
}

// GET -> /api/restaurants/
router.get('/', index);

module.exports = router; 