const express = require('express');
global.Config = require("./Config");
const Kavenegar = require('kavenegar');
const RouterIndex = require('./Routers/IndexRouter')
const app = express();
const mongoose = require('mongoose')
    //set 
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');





// Read Router
app.use('/', RouterIndex);

























mongoose.connect('mongodb://localhost:27017/Yajoo', { useNewUrlParser: true, useUnifiedTopology: true });


app.listen(Config.Port, () => {
    console.log(`Server ${Config.Port} Run`);
})