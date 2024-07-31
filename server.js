const express = require('express');
const path = require('path');
require('dotenv').config();
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

// DATABASE
require('./config/database');

const app = express();
const authCtrl = require("./controllers/auth");
const petsCtrl = require("./controllers/pets");
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index.ejs', {
        user: req.session.user,
        userType: req.session.user,
        // user: user,
    });
});

app.use("/auth", authCtrl);
app.use("/pets", petsCtrl);

app.listen(PORT, () => {
    console.log('Listening on port 3000');
});