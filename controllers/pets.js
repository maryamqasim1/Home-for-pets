const express = require("express");
const router = express.Router();

const Pets = require('../models/pet');

///////////// for testing remove later ////////////////////////////
const user = {
    email: 'admin@admin.com',
    userType: 'admin',

    // email: 'user@user.com',
    // userType: 'user'
};

router.get('/', async (req, res) => {
    const pets = await Pets.find();
    res.render('pets/index.ejs', { pets });
});

router.get('/new', (req, res) => {
    res.render('pets/new.ejs');
});

router.get('/:id', async (req, res) => {
    const pet = await Pets.findById(req.params.id);
    res.render('pets/show.ejs', {
        pet,
        // user: req.session.user,
        // userType: req.session.user,
        user: user,
    });
});

router.post('/', async (req, res) => {
    await Pets.create(req.body);
    res.redirect('/pets');
});

module.exports = router;