const express = require('express');
global.Config = require("./Config");
const validator = require('express-validator');
const session = require('express-session');
const Mongostore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const Kavenegar = require('kavenegar');
const RouterIndex = require('./Routers/IndexRouter')
const app = express();
require('dotenv').config();
const mongoose = require('mongoose')
    //set 
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
// Session+Cookie+flash
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 2000 * 3600 * 24 * 100)
    },
    store: new Mongostore({ mongooseConnection: mongoose.connection })
}));
app.use(flash());



// Read Router
app.use('/', RouterIndex);

























mongoose.connect('mongodb://localhost:27017/Yajoo', { useNewUrlParser: true, useUnifiedTopology: true });


app.listen(Config.Port, () => {
    console.log(`Server ${Config.Port} Run`);
})