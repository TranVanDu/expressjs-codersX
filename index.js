require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

var db = require('./db');
var cookieParser = require('cookie-parser');
var userRouter = require('./routers/user.router');
var authRouter= require('./routers/auth.router');
var proRouter = require('./routers/product.router');
var middleware = require('./middlewares/middleware');
var sesionMiddleware = require('./middlewares/sessionMiddleware');
var cart = require('./routers/cart.router');

const app = express();
const port = 3001;

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) ;// for parsing application/x-www-form-urlencoded
app.use(sesionMiddleware);
app.set('view engine','pug');
app.set('views', './views');

app.use(express.static('public'));
app.get('/' ,(req, res) => res.render('index.pug',{
	name: 'Coder'
}));
app.use('/auth',authRouter);
app.use('/users',middleware.cookie,userRouter);
app.use('/products', proRouter);
app.use('/cart', cart);

app.listen(port,() => console.log('server is start on port'+ port));
