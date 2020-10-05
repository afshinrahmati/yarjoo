const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authControllers')

router.get('/Regester',AuthController.RegesterGet)








module.exports = router;