const express = require("express");
const router = express.Router();

const Pets = require('../models/pet');
const session = require("express-session");
const User = require("../models/user");

///////////// for testing remove later ////////////////////////////
// const user = {
//     // email: 'admin@admin',
//     // userType: 'admin',

//     email: 'user@user',
//     userType: 'user'
// };
// console.log(user.email)

router.get('/rehome', (req, res) => {
    res.render('pets/rehome.ejs');
})

router.post('/rehome', async (req, res) => {
    // await Pets.create({...req.body, owner: user.email});
    // const x = await User.findOne({ email: user.email })
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
    // if (pet.owner) {
    //     const owner = 
    // }
    const pet = await Pets.findById(req.params.id);
    const ownerInfo = await User.findById(pet.owner);
    console.log(pet);
    res.render('pets/show.ejs', {
        pet,
        ownerInfo,
        user: req.session.user,
        userType: req.session.user,
        // user: user,
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