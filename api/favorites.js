// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');


// Models
const { Favorite } = require('../models');

// Controllers
const index = async (req, res) => {
    console.log('inside of /api/favorites');
    try {
        const allfavorite = await Favorite.find({});

        res.json({ favorites: allfavorite });
    } catch (error) {
        console.log('Error inside of /api/favorites');
        console.log(error);
        return res.status(400).json({ message: 'favorite not found. Please try again.' });
    }
}

const show = async (req, res) => {
    const { id } = req.params;
    try {
        // look for book based on id
        const favorite = await Favorite.findById(id);
        res.json({ favorite });
    } catch (error) {
        console.log('Error inside of /api/favorites/:id');
        console.log(error);
        return res.status(400).json({ message: 'favorite not found. Try again...' });
    }
}


const create = async (req, res) => {
    const { businessId, userId, businessType, name } = req.body;

    try {
        const newfavorite = await Favorite.create({ businessId, userId, businessType, name })
        console.log('new favorite created', newfavorite);
        res.json({ favorite: newfavorite });
    } catch (error) {
       console.log('Error inside of POST of /api/favorites');
       console.log(error);
       return res.status(400).json({ message: 'favorite was not created. Please try again...' }); 
    }
}


const update = async (req, res) => {
    console.log(req.body);

    try {
        const updatedfavorite = await Favorite.update({ name: req.body.name }, req.body); // updating the book
        const favorite = await favorite.findOne({ name: req.body.name });

        console.log(updatedfavorite); // { n: 1, nModified: 0, ok: 1 }
        console.log(favorite); // a book object 

        res.redirect(`/api/favorites/${favorite.id}`);

    } catch (error) {
        console.log('Error inside of UPDATE route');
        console.log(error);
        return res.status(400).json({ message: 'favorite could not be updated. Please try again...' });
    }

}

const deleteFavorite = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const result = await Favorite.findByIdAndRemove(id);
        console.log(result);
        res.redirect('/api/favorites');
    } catch (error) {
        console.log('inside of DELETE route');
        console.log(error);
        return res.status(400).json({ message: 'favorite was not deleted. Please try again...' });
    }
}

// GET api/books/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'favorites endpoint OK!'});
});

// GET -> /api/favorites/
router.get('/', index); 
// GET -> /api/favorites/:id
router.get('/:id', show);
// POST -> /api/favorites
router.post('/', passport.authenticate('jwt', { session: false }), create);
// PUT -> /api/favorites
router.put('/', passport.authenticate('jwt', { session: false }), update);
// DELETE => /api/favorites/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteFavorite);

module.exports = router;