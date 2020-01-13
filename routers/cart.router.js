var express = require('express');
var cartController = require('../controllers/cart.controller');
var router = express.Router();

router.get('/add/:productId', cartController.addCart);
module.exports = router;