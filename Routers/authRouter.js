const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authControllers')
const ValidatorAuth = require('../validator/authValidtor');

router.get('/Regester', AuthController.RegesterGet);

router.post("/Regester1", ValidatorAuth.Regester(), AuthController.PostRegestedr);

// **code Rigth
router.post('/verify',AuthController.Postverify)







module.exports = router;