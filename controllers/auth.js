const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require('../models/user');

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res) => {
    try {
        const userInDB = await User.findOne({ email: req.body.email })
        if (userInDB)
            res.send('email already taken.')

        if (req.body.password !== req.body.confirmPassword)
            res.send('Password and Confirm Password must match.')

        const hashedPass = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPass;
        const user = await User.create(req.body);
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs');
});

router.post('/sign-in', async (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.password;

        const userInDB = await User.findOne({ email: email });
        if (!userInDB)
            res.send('Login failed. Please try again.');

        const validPassword = bcrypt.compareSync(pass, userInDB.password);
        if (!validPassword)
            return res.send("Login failed. Please try again.");

        req.session.user = {
            email: userInDB.email,
            userType: userInDB.userType
        };
        res.redirect('/');

    } catch (error) {
        console.error(error);
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;