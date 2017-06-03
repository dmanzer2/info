
module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),

		watch:{
			options:{livereload:true},
			files:['*/**','server/**'],
			tasks:[]
		},
		express:{
			all:{
				options:{
					port:9000,
					hostname:'localhost',
					bases:['.'],
					livereload:true
				}
			}
		},
		cssmin: {
		  minify: {
		    files: [{
		      expand: true,
		      cwd: 'css',
		      src: ['**/*.css', '!**/*.min.css'],
		      dest: 'css',
		      ext: '.min.css'
		    }]
		  },
		  options: {
		    shorthandCompacting: false,
		    roundingPrecision: -1
		  },
		  combine: {
		    files: {
		      'css/style.css': ['css/bootstrap.min.css', 'css/main.css','css/supersized.css','css/supersized.shutter.css','css/fancybox/jquery.fancybox.css','css/fonts.css','css/font-awesome.css','css/bootstrap-responsive.min.css','css/responsive.css','css/supersized.css','css/supersized.shutter.css']
		    }
		  }
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default',['express','watch','cssmin']);
	grunt.registerTask('serve',['express','watch','cssmin']);

	};
