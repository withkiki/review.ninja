var assert = require('assert');
// module
var approval = require('../approval/default');

module.exports = function(uuid, done) {

	// models
	var Comm = require('mongoose').model('Comm');
	var Vote = require('mongoose').model('Vote');

	Comm.with({uuid: uuid}, function(err, comm) {

		if(!comm) {
			return done(null, 'pending');
		}

		Vote.find({comm: uuid}, function(err, vote) {

			if(!vote) {
				return done(null, 'pending');
			}

			approval(comm.config, vote, function(err, approval) {

				if(err) {
					return done(null, 'pending');
				}

				done(err, approval);

			});

		});

	});

};