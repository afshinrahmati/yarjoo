const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authControllers')

router.get('/Regester', AuthController.RegesterGet)
router.post("/Regester1", AuthController.PostRegestedr)







module.exports = router;