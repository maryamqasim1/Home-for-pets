const express = require("express");
const router = express.Router();

const session = require("express-session");
const Pets = require('../models/pet');
const User = require("../models/user");

router.get('/rehome', (req, res) => {
    res.render('pets/rehome.ejs');
})

router.post('/rehome', async (req, res) => {
    LogedInUser = req.session.user.email;
    const owner = await User.findOne({ email: LogedInUser })
    await Pets.create({ ...req.body, owner: owner._id });
    res.redirect('/pets');
});

router.get('/', async (req, res) => {
    const pets = await Pets.find();
    res.render('pets/index.ejs', { pets });
});

router.get('/new', (req, res) => {
    res.render('pets/new.ejs');
});

router.get('/:id', async (req, res) => {
    const pet = await Pets.findById(req.params.id);
    const ownerInfo = await User.findById(pet.owner);
    res.render('pets/show.ejs', {
        pet,
        ownerInfo,
        user: req.session.user,
    });
});

router.post('/', async (req, res) => {
    await Pets.create(req.body);
    res.redirect('/pets');
});

router.get('/:id/edit', async (req, res) => {
    const pet = await Pets.findById(req.params.id);
    res.render('pets/edit.ejs', { pet })
});

router.put('/:id', async (req, res) => {
    const pet = await Pets.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/pets/${req.params.id}`)
});

router.delete('/:id', async (req, res) => {
    await Pets.findByIdAndDelete(req.params.id);
    res.redirect('/pets');
});

module.exports = router;