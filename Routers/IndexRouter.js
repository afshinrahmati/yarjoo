const express = require('express');
const router = express.Router();

//Home
router.get("/", async function(req, res, next) {
        try {
            return res.render('home/index.ejs')
        } catch (error) {

        }
    })
    // Login and Regester
router.use("/user", require('./authRouter'));
// Dashboard
router.use("/dashboard", require('./dashboard'))
    // logout





module.exports = router;