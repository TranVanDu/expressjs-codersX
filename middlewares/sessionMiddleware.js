var shortid = require('shortid');
var db = require('../db');
module.exports = function (req, res, next){
	if(!req.signedCookies.sessionId){
		var sessionId = shortid.generate();
		res.cookie('sessionId',sessionId,{
			signed:true
		});
		db.get('sessions').push({
			id: sessionId
		}).write();
	}
	var sessionId = req.signedCookies.sessionId;
    var number = 0;
	var user = db.get('sessions').find({id: sessionId}).get('cart').value();
	for(var x in user){
		number += user[x];
	}
	res.locals.number = number;
	next();
}