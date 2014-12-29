/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			lw14: {
				src: [
					'js/libraries/*.js',
					'js/lw14-global.js'
				],
				dest: 'dist/js/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			lw14: {
				src: '<%= concat.lw14.dest %>',
				dest: 'dist/js/<%= pkg.name %>.min.js'
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {}
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			lw14: {
				src: 'js/lw14-global.js'
			}
			// lib_test: {
			//	src: ['lib/**/*.js', 'test/**/*.js']
			// }
		},
		// qunit: {
		//	files: ['test/**/*.html']
		// },
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			js: {
				files: '<%= jshint.lw14.src %>',
				tasks: ['jshint:lw14', 'concat:lw14', 'uglify:lw14']
			},
			css: {
				files: 'css/*.less',
				tasks: ['less:lw14', 'cssmin:minifyLivingWater']
			}
			// lib_test: {
			//	files: '<%= jshint.lib_test.src %>',
			//	tasks: ['jshint:lib_test', 'qunit']
			// }
		},

		less: {
			lw14: {
				options: {
					banner: '/* Would God use this website to bring people to Him for His glory. */',
					paths: [ 'css' ],
					compress: true,
					strictImports: true,
					outputSourceFiles: true,
					sourceMap: true,
					sourceMapURL: '<%= pkg.name %>.css.map',
					sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
				},

				files: {
					'dist/css/lw14.css' : 'css/lw14-base.less'
				}
			}
		},

		cssmin: {
			options: {
				compatibility: 'ie8',
				keepSpecialComments: '*',
				noAdvanced: true
			},

			minifyLivingWater: {
				src: [
					'css/libraries/bootstrap.css',
					'dist/css/lw14.css'
				],
				dest: 'dist/css/lw14.min.css'
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Default task.
	grunt.registerTask('default', ['jshint', /*'qunit',*/ 'concat', 'uglify', 'less', 'cssmin']);

};
