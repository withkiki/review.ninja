// models
var Tool = require('mongoose').model('Tool');

module.exports = {

/************************************************************************************************************

	Models:

	+ Tool, where repo=repo-uuid

************************************************************************************************************/

	all: function(req, done) {

		Tool.find({repo: req.args.repo}, function(err, tool) {
			
			done(err, tool);

		});

	},

/************************************************************************************************************

	Models:

	+ Tool

************************************************************************************************************/

	add: function(req, done) {

		Tool.create({repo: req.args.repo, name: req.args.name}, function(err, tool) {

			done(err, tool);

		});

	},

/************************************************************************************************************

	Models:

	+ Tool, where id=id

************************************************************************************************************/

	get: function(req, done) {

		Tool.findById(req.args.id, function(err, tool) {
			
			done(err, tool);

		});

	},

/************************************************************************************************************

	Models:

	+ Tool, where id=id

************************************************************************************************************/

	set: function(req, done) {

		Tool.findById(req.args.id, function(err, tool) {
			
			tool.name = req.args.name || tool.name;

			tool.save(function(err, tool) {

				done(err, tool);

			});

		});

	}

};