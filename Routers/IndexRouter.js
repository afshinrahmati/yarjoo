const express = require('express');
const router = express.Router();
const midAuth = require('../middleware/authsession');
const midDashboard = require('../middleware/dashboardsession');
const User = require('../models/RegesterModels');
//*****************Home*************
router.get("/", async function(req, res, next) {
    try {
        return res.render('home/index.ejs')
    } catch (error) {

    }
});

// ***************Login and Regester**************
router.use("/user", midAuth, require('./authRouter'));

// ********Dashboard*****************
router.use("/dashboard", midDashboard, require('./dashboard'));

//**************** */ logout******************
router.get('/logout', async(req, res, next) => {

    req.session.destroy();
    return res.redirect('/')


});

//**************404 page **************   
router.all('*', async(req, res, next) => {
    try {
        res.status(404).render('error404.ejs', { title: req.path })
    } catch (error) {
        next();
    }

});


module.exports = router;