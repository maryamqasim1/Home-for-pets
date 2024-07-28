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

app.get('/', (req, res, next) => {
    res.render('index.ejs', {
        user: req.session.user
    });
});

app.use("/auth", authCtrl);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});