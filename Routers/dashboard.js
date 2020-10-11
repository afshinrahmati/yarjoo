const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboarContoler');
const Validatordashbaoard = require('../validator/dashboardValidator');


router.use((req, res, next) => {
    if(!req.session.user)
    {
     return res.redirect("/")
    }else{
    if (req.session.user.OKy) {
        return next();
    }
}
    res.redirect('/');
});

router.get('/', dashboardController.a);







module.exports = router;