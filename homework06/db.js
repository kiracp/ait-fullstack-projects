// Set up mongoose and slugs plugin
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  URLSlugs = require('mongoose-url-slugs');

// Create the schemae
var Item = new mongoose.Schema({
	name: String,
	quantity: Number,
	checked: Boolean
});

var List = new mongoose.Schema({
	name: String,
	createdBy: String,
	items: [Item]
});

// Configure URLSlugs plugin - should add a schema
List.plugin(URLSlugs('name'));

// Register models
mongoose.model('List', List);
mongoose.model('Item', Item);

mongoose.connect('mongodb://localhost/hw06');