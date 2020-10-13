const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authControllers')
const ValidatorAuth = require('../validator/authValidtor');

router.use((req, res, next) => {
    if (req.session.user) {
        return res.redirect("/dashboard")
    } else {
        return next();
    }
});
router.get('/Regester', AuthController.RegesterGet);

router.post("/Regester1", ValidatorAuth.Regester(), AuthController.PostRegestedr);


// ****Login
router.get('/login',AuthController.LoginGet);
router.post('/login1',AuthController.LoginPost)


// **code Rigth
router.post('/verify',AuthController.Postverify)







module.exports = router;