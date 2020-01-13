const shortid = require('shortid');
var db = require('../db');

module.exports.index = function(req,res){
	res.render('user/index',{
		users: db.get('users').value()
	});
};
module.exports.search = function(req,res){
    var q = req.query.q;
	var users = db.get('users').value();
	var queryUser = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !==-1;
	});
	res.render('user/index',{
		users: queryUser
	});
};

module.exports.create = function(req, res){
   res.render('user/create');
};
module.exports.view = function(req, res){
    var id = req.params.id;
    console.log(id);
    var user = db.get('users').find({id: id}).value();
    res.render('user/view',{
        users: user
    });
};
module.exports.postCreate = function(req,res){
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');
    db.get('users').push(req.body).write();
    res.redirect('/users');
};