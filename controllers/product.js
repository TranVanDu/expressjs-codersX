var db = require('../db');

module.exports.getProduct = function(req, res){
	var page = req.query.page || 1;
	var perPage = 8;

	var start = (page -1) * perPage;
	var end = perPage *page;

	var drop = (page -1) * perPage;
	res.render('products/product',{
       //products: db.get('products').slice(start, end).value()
       products: db.get('products').drop(drop).take(perPage).value()
	});
}