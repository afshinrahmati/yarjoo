const express = require('express');
global.Config = require("./Config");
const RouterIndex = require('./Routers/IndexRouter')
const app= express();

//set 
app.use(express.static(__dirname+"/public"));
app.set('view engine','ejs');





// Read Router
app.use('/',RouterIndex);



























app.listen(Config.Port,()=>{
    console.log(`Server ${Config.Port} Run`);
})
