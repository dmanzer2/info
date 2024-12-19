module.exports = function(grunt) {
	grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),
  
	  // Watch task configuration
	  watch: {
		options: { livereload: true },
		files: ['**/*', 'server/**/*'],
		tasks: []
	  },
  
	  // Connect server configuration
	  connect: {
		server: {
		  options: {
			port: 9000,
			hostname: 'localhost',
			livereload: true,
			base: '.'
		  }
		}
	  },
  
	  // CSSMin task configuration
	  cssmin: {
		options: {
		  shorthandCompacting: false,
		  roundingPrecision: -1
		},
		minify: {
		  files: [{
			expand: true,
			cwd: 'css',
			src: ['**/*.css', '!**/*.min.css'],
			dest: 'css',
			ext: '.min.css'
		  }]
		},
		combine: {
		  files: {
			'css/style.min.css': [
			  'css/bootstrap.min.css',
			  'css/main.css',
			  'css/supersized.css',
			  'css/supersized.shutter.css',
			  'css/fancybox/jquery.fancybox.css',
			  'css/fonts.css',
			  'css/font-awesome.css',
			  'css/bootstrap-responsive.min.css',
			  'css/responsive.css'
			]
		  }
		}
	  }
	});
  
	// Load Grunt tasks
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
  
	// Register tasks
	grunt.registerTask('default', ['connect', 'watch', 'cssmin']);
	grunt.registerTask('serve', ['connect', 'watch', 'cssmin']);
  };
  