const express = require('express');
const router = express.Router();
const dashboardKaarfama = require("../controllers/karfarma");


// ****page asli****
router.get("/",dashboardKaarfama.karfarmapaner);

// ****atlat kasbo kar****
router.get("/aboutwork",dashboardKaarfama.aboutwork)


// ****Iran*****
router.get('/ostan/:id',dashboardKaarfama.OstanFind)



module.exports = router;