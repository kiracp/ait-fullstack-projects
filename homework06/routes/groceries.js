var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var List = mongoose.model('List');
var Item = mongoose.model('Item');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* All lists */
router.get('/list', function (req, res) {

	List.find({}, function(err, lists, count) {
		res.render('list', {list: lists} );
	}); 
});

/* Clears all lists */
router.get('/list/remove', function(req,res) {
	List.find({}, function(err, lists) {
		List.remove(function(err) {
			console.log('Cleared lists!');
		});
	});
	res.redirect(303, '/list');
})

/* GET to display Create Form */
router.get('/list/create', function (req,res) {
	res.render('list-create');
});

/* POST to create a new list */
router.post('/list/create', function (req,res) {
	// create new list object
	var l = new List({
	  name:req.body.name,
	  createdBy:req.body.createdBy,
	})

	// Call save to actually store in database
	l.save(function(err, list, count) {
		res.redirect(303, '/list/'+list.slug);
	});	
});

/* GET for individual list page */
router.get('/list/:slug', function(req, res) {
	List.findOne({slug:req.params.slug}, function(err, list) {
		res.render('list-slug', {title: list.name, 
			items: list.items, 
			slug: req.params.slug} );
	});
}); 

/* POST to add new items to a list */
router.post('/item/create', function(req,res){
	// Create new item object
	var i = new Item({
		name:req.body.name,
		quantity:req.body.qty,
		// Initialize 'checked' to false
		checked:false,
	});

	// Add new item to list specified in slug
	List.findOne({slug:req.body.slug}, function(err, l) {
		l.items.push(i);
		// Save item and redirect back to list page
		l.save(function (err, list, count) {
			res.redirect(303, '/list/'+list.slug);
		});
	});
}); 

/* POST to check off objects */
router.post('/item/check', function(req, res) {
	// If none checked, do nothing
	if (typeof req.body.checked == 'undefined') {
		res.redirect(303, '/list/'+req.body.slug);
	}

	// Else ... look through list that matches slug
	List.find({slug:req.body.slug}, function(err, list) {
		var myArray = list[0].items;

		// If only one is checked off
		if (typeof req.body.checked == "string") {
			myArray.forEach(function(ele) {
				if (ele.name === req.body.checked) {
					// All matches get checked off
					ele.checked = true;
				}
			})
		// If multiple, it will be in an array form
		} else if (typeof req.body.checked == 'object') {
			myArray.forEach(function(ele) {
				if (req.body.checked.indexOf(ele.name) > -1) {
					// All matches get checked off
					ele.checked = true;
				}
			});
		}
		// Save checked values, reload list page
		list[0].save(function(err, list, count) {
			res.redirect(303, '/list/'+list.slug);
		});
	});
});

// Set up router object
module.exports = router;