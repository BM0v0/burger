var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

// GET method 
router.get('/', function (req, res) {
	res.redirect('/burgers');
});
// GET method - selectAll callback function
router.get('/burgers', function (req, res) {
	burger.selectAll(function (data) {
		var hbsObject = { burgers: data };
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

//Post Method

router.post('/burgers/create', function (req, res) {
	burger.insertOne(['burger_name','devoured'], [req.body.burger_name,0], function () {
		res.redirect('/burgers');
	});
});

// route

router.put('/burgers/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	burger.updateOne({ devoured: req.body.devoured }, condition, function () {
		res.redirect('/burgers');
	});
});


module.exports = router;