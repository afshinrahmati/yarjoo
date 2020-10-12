const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboarContoler');
const Validatordashbaoard = require('../validator/dashboardValidator');
const allUser = require("../models/RegesterModels");
const moment = require('jalali-moment');
const UPload=require('../upload/Upload');
// ******DASHBARD********

//no can see dashbaord
router.use((req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/")
    } else {
        return next();
    }
});
// admin
router.use(async(req, res, next) => {

    if (req.session.user.role == "admin") {
        console.log(req.session.user);
        let Alluser = await allUser.find({});
        var result = Alluser.map(function(el) {
            var o = Object.assign({}, el);
            o.datfarsi = moment(el.createdAt, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('YYYY/MM/DD , HH:mm:ss');
            return o;
        });
        return res.render('panel/admin.ejs', { User: req.session.user, alluser: Alluser, d: result })
    } else {
        return next();
    }
});
//CKek oky 
router.use((req, res, next) => {
    if (req.session.user.OKy) {
        return next();
    }
});

router.get('/', dashboardController.Profile);
router.post('/profile',UPload.single('img'),dashboardController.ProfilePost);



router.get('/karjo/:id',dashboardController.karjopanel)








module.exports = router;