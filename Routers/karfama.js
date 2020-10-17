const express = require('express');
const router = express.Router();
const dashboardKaarfama = require("../controllers/karfarma");



router.get("/", (req, res, next) => {
    console.log(1);
});



module.exports = router;