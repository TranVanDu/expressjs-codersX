
var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: './public/uploads' });

var userController = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var middleware = require('../middlewares/middleware');


var router = express.Router();

router.get('/', middleware.cookie, userController.index);
router.get('/search', userController.search);
router.get('/create',userController.create);
router.get('/:id', userController.view);
router.post('/create',upload.single('avatar'),validate.createPost,userController.postCreate);

module.exports = router;