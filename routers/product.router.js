var express = require('express');
var products = require('../controllers/product');
var router = express.Router();

router.get('/',products.getProduct);

module.exports = router;