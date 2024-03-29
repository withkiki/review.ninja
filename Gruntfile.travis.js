
var TRAVIS_COMMIT = process.env.TRAVIS_COMMIT;
var MOCHA_TOOL_ID = '53a47fcff5663c4435b9666c';
var KARMA_TOOL_ID = '53a87bdd3df0d5ec4c4a7bd9';
var JSHINT_TOOL_ID = '53a47fb9f5663c4435b9666a';

module.exports = function(grunt) {

	var config = {

		// server tests
		mochaTest: {
			server: {
				options: {
					reporter: require('mocha.ninja'),
					captureFile: './output/mochaTest/server.out'
				},
				src: ['src/tests/server/**/*.js']
			}
		},

		// client tests
		karma: {
			unit: {
				configFile: 'src/tests/karma.ninja.js',
				reporters: ['karma-reviewninja-reporter']
			}
		},

		// jshint
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			app: {
				options: {
					reporter: 'node_modules/jshint.ninja/index.js',
					reporterOutput: './output/jshint/jshint.out'
				},
				files: {
					src: ['app.js', 'src/client/**/*.js', 'src/server/**/*.js', 'src/tests/**/*.js']
				}
			}
		},

		// review.ninja
		http: {
			'post-mocha-results': {
				options: {
				  url: 'http://review.ninja/vote/' + MOCHA_TOOL_ID + '/' + TRAVIS_COMMIT,
				  method: 'POST',
				  ignoreErrors: true
				},
				files: {
					'report': 'output/mochaTest/server.out'
				}
			},
			'post-karma-results': {
				options: {
				  url: 'http://review.ninja/vote/' + KARMA_TOOL_ID + '/' + TRAVIS_COMMIT,
				  method: 'POST',
				  ignoreErrors: true
				},
				files: {
					'report': 'output/karma/client.out'
				}
			},
			'post-jshint-results': {
				options: {
				  url: 'http://review.ninja/vote/' + JSHINT_TOOL_ID + '/' + TRAVIS_COMMIT,
				  method: 'POST',
				  ignoreErrors: true
				},
				files: {
					'report': 'output/jshint/jshint.out'
				}
			}
		}		
		
	};

	// Initialize configuration
	grunt.initConfig(config);

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-http');
	
	grunt.registerTask('default', ['jshint', 'mochaTest', 'karma', 'http']);

};
