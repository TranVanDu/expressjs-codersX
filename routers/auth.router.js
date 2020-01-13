var express = require('express');

var authController = require('../controllers/auth.controller');
var validate = require('../validate/user.validate');

var router = express.Router();

router.get('/login', authController.login);
router.get('/signin', authController.signin);
router.post('/login', authController.postLogin)
router.post('/signin', validate.postValidateSignin ,authController.postSignin);

module.exports = router;