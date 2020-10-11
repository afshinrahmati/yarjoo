const Controllr = require('../controllers/Controllr');
const User = require('../models/RegesterModels');
const momment = require('jalali-moment');

const { body, validationResult } = require('express-validator')
module.exports = new class DashboardController extends Controllr {

    async a(req, res, next) {
        console.log(1);
        res.send("wellocom to dashboard")
    }



}