
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
  		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
	grunt.registerTask('default',['express','watch']);
	grunt.registerTask('server',['express','watch']);

	};
