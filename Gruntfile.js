var _ = require("lodash");
var allJs = ["Gruntfile.js", "src/**/*.js", "test/**/*.js"];
var adminPortalBuild = "build/adminPortal/";
var domainWebsiteBuild = "build/domainWebsite/";
var adminPortalWWW = adminPortalBuild + "public/";
var domainWebsiteWWW = domainWebsiteBuild + "public/";
var adminPortalJs = adminPortalWWW + "js/";
var domainWebsiteJs = domainWebsiteWWW + "js/";
var adminPortalCss = adminPortalWWW + "css/";
var domainWebsiteCss = domainWebsiteWWW + "css/";
var adminPortalFonts = adminPortalWWW + "fonts/";
var adminPortalTemp = "build/temp/adminPortal/";
var domainWebsiteTemp = "build/temp/domainWebsite/";
var adminPortalTempCss = adminPortalTemp + "css/";
var domainWebsiteTempCss = domainWebsiteTemp + "css/";
var tempJs = adminPortalTemp + "js/";
var adminPortalBrowserified = tempJs + "app.js";
var domainWebsiteBrowserified = tempJs + "app.js";
var clientEnvVariablesTemp = adminPortalTemp + "/envVariables";
var fontFiles = [
	"node_modules/bootstrap/fonts/*",
	"node_modules/font-awesome/fonts/*"
];
var npmCssFiles = [
	"node_modules/angular-material/angular-material.min.css",
	"node_modules/animate.css/animate.min.css",
	"node_modules/font-awesome/css/font-awesome.min.css",
];
var testFiles = "test/**/Test*.js";

var adminPortalProductionBrowserifyTasks = [
	"copy:adminPortalTempResources",
	"copy:adminPortalEnvVariablesProduction",
	"babel:adminPortal",
	"browserify:adminPortal",
	"uglify:adminPortal",
	"copy:adminPortalJs"
];

var adminPortalDevelopmentBrowserifyTasks = _.difference(_.clone(adminPortalProductionBrowserifyTasks), ["uglify:adminPortal"]);
adminPortalDevelopmentBrowserifyTasks[1] = "copy:adminPortalEnvVariablesDevelopment";

var adminPortalCopyTasks = [
	"copy:adminPortalServer",
	"copy:adminPortalViews",
	"copy:adminPortalImages",
	"copy:adminPortalCss",
	"copy:adminPortalFonts",
	"copy:adminPortalAngular"
];

var adminPortalProductionTasks = _.concat(
	[
		"jshint",
		"clean:adminPortal",
		"sass:adminPortal"
	],
	adminPortalProductionBrowserifyTasks,
	"concurrent:adminPortalCopy",
	[
		"cssmin"
	]
);

var adminPortalDevelopmentTasks = _.concat(
	[
		"jshint",
		"clean:adminPortal",
		"sass:adminPortal"
	],
	adminPortalDevelopmentBrowserifyTasks,
	"concurrent:adminPortalCopy",
	[
		"cssmin"
	]
);

/////////////////
var domainWebsiteCopyTasks = [
	"copy:domainWebsiteServer",
	"copy:domainWebsiteJs",
	"copy:domainWebsiteCss",
	"copy:domainWebsiteViews"
];

var domainWebsiteBrowserifyTasks = [
	"babel:domainWebsite",
	"browserify:domainWebsite",
	"uglify:domainWebsite"
];

var domainWebsiteProductionTasks = _.concat(
	[
		"jshint",
		"clean:domainWebsite",
		"sass:domainWebsite"
	],
	domainWebsiteBrowserifyTasks,
	domainWebsiteCopyTasks,
	[
		"cssmin"
	]
);


var domainWebsiteDevelopmentTasks = _.difference(domainWebsiteProductionTasks, ["uglify:domainWebsite"]);

var allDevelopmentTasks = _.concat(adminPortalDevelopmentTasks, domainWebsiteDevelopmentTasks);
var allProductionTasks = _.concat(adminPortalProductionTasks, domainWebsiteProductionTasks);


module.exports = grunt => {

	grunt.registerTask("test", ["tape:local"]);
	grunt.registerTask("adminPortalProduction", adminPortalProductionTasks);
	grunt.registerTask("adminPortalDevelopment", adminPortalDevelopmentTasks);
	grunt.registerTask("domainWebsiteDevelopment", domainWebsiteDevelopmentTasks);
	grunt.registerTask("adminPortalProduction", adminPortalProductionTasks);
	grunt.registerTask("domainWebsiteProduction", domainWebsiteDevelopmentTasks);
	grunt.registerTask("allDevelopment", allDevelopmentTasks);
	grunt.registerTask("allProduction", allProductionTasks);
	grunt.registerTask("watch:allDevelopment", ["watch"]);
	grunt.registerTask(
		"watchAdminPortal",
		["concurrent:adminPortalWatch"]
	);
	grunt.registerTask(
		"watchDomainWebsite",
		["watch:lint", "watch:domainWebsiteBrowserify", "watch:domainWebsiteCss", "watch:domainWebsiteViews", "watch:domainWebsiteServer"]
	);

	grunt.initConfig({
		watch: {
			lint: {
				files: allJs,
				tasks: ["jshint:all"]
			},
			adminPortalBrowserify: {
				files: ["src/adminPortal/browserify/**/*.js", "src/adminPortal/resources/**/*.js"],
				tasks: adminPortalDevelopmentBrowserifyTasks
			},
			adminPortalCss: {
				files: ["src/adminPortal/sass/**"],
				tasks: ["sass:adminPortal", "cssmin", "copy:adminPortalCss"]
			},
			adminPortalViews: {
				files: ["src/adminPortal/index.html", "src/adminPortal/browserify/**/*.html"],
				tasks: ["copy:adminPortalViews"]
			},
			adminPortalImages: {
				files: ["src/adminPortal/images/**"],
				tasks: ["copy:adminPortalImages"]
			},
			adminPortalServer: {
				files: ["src/adminPortal/server.js"],
				tasks: ["copy:adminPortalServer"]
			},
			domainWebsiteServer: {
				files: ["src/domainWebsite/server.js"],
				tasks: ["copy:domainWebsiteServer"]
			},
			domainWebsiteCss: {
				files: ["src/domainWebsite/sass/**"],
				tasks: ["sass:domainWebsite", "cssmin", "copy:domainWebsiteCss"]
			},
			domainWebsiteViews: {
				files: ["src/domainWebsite/index.html", "src/domainWebsite/views/**"],
				tasks: ["copy:domainWebsiteViews"]
			},
			domainWebsiteBrowserify: {
				files: ["src/domainWebsite/browserify/**"],
				tasks: domainWebsiteBrowserifyTasks
			},
		},
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			adminPortalCopy: adminPortalCopyTasks,
			adminPortalWatch: [
				"watch:lint",
				"watch:adminPortalBrowserify",
				"watch:adminPortalCss",
				"watch:adminPortalViews",
				"watch:adminPortalImages",
				"watch:adminPortalServer"
			]
		},
		jshint: {
			options: {
				esnext: true,
				curly: true,
				forin: true,
				eqeqeq: true,
				eqnull: true,
				latedef: "nofunc",
				notypeof: true,
				undef: true,
				unused: true,
				node: true
			},
			all: allJs
		},
		babel: {
			adminPortal: {
				options: {
					sourceMap : [
						true
					],
					presets: ['babel-preset-es2015']
				},
				files:[
					{expand: true, cwd: "src/adminPortal/", src: ["browserify/**/*.js"], dest: adminPortalTemp}
				]
			},
			domainWebsite: {
				options: {
					sourceMap : [
						true
					],
					presets: ['babel-preset-es2015']
				},
				files:[
					{expand: true, cwd: "src/domainWebsite/", src: ["browserify/**/*.js"], dest: domainWebsiteTemp}
				]
			}
		},
		browserify: {
			adminPortal: {
				options: {
					transform : [
						"browserify-ngannotate"
					]
				},
				src: ["build/temp/adminPortal/browserify/app.js"],
				dest: adminPortalBrowserified
			},
			domainWebsite: {
				options: {
					transform : [
						"browserify-ngannotate"
					]
				},
				src: ["build/temp/domainWebsite/browserify/app.js"],
				dest: domainWebsiteBrowserified
			}
		},
		uglify: {
			adminPortal: {
				src: adminPortalBrowserified,
				dest: tempJs + "app.min.js",
				options: {
					sourceMap: true
				}
			},
			domainWebsite: {
				src: domainWebsiteBrowserified,
				dest: tempJs + "app.min.js",
				options: {
					sourceMap: true
				}
			}
		},
		copy: {
			adminPortalServer: {
				files: [
					{expand: true, cwd: "src/adminPortal/", src: ["server.js"], dest: adminPortalBuild},
				]
			},
			adminPortalViews: {
				files:[
					{expand: true, flatten: true, src: ["src/adminPortal/index.html"], dest: adminPortalWWW},
					{expand: true, cwd: "src/adminPortal/", src: ["views/**/*.html"], dest: adminPortalWWW},
					{expand: true, cwd: "src/adminPortal/browserify/", src: ["components/**/*.html"], dest: adminPortalWWW},
					{expand: true, cwd: "src/adminPortal/browserify/", src: ["shared/**/*.html"], dest: adminPortalWWW}
				]
			},
			adminPortalAngular: {
				files: [
					{expand: true, cwd: "node_modules/angular/", src: ["angular.min.js", "angular.min.js.map"], dest: adminPortalJs}
				]
			},
			adminPortalImages: {
				files: [
					{expand: true, cwd: "src/adminPortal/", src: ["images/**"], dest: adminPortalWWW}
				]
			},
			adminPortalCss: {
				files: [
					{expand:true, cwd: adminPortalTemp, src: ["css/**"], dest: adminPortalWWW},
					{expand:true, flatten: true, src:[npmCssFiles], dest: adminPortalCss}

				]
			},
			adminPortalFonts: {
				files: [
					{expand:true, flatten: true, src:fontFiles, dest: adminPortalFonts}
				]
			},
			adminPortalTempResources: {
				files: [
					{expand: true, cwd: "src/adminPortal/", src: ["resources/*"], dest: adminPortalTemp},
					{expand: true, cwd: "src/domainWebsite/", src: ["resources/*"], dest: domainWebsiteTemp}
				]
			},
			adminPortalJs: {
				files: [
					{expand: true, cwd: tempJs, src: ["app.js", "app.min.js", "app.min.js.map"], dest: adminPortalJs}
				]
			},
			adminPortalEnvVariablesDevelopment: {
				files: [
					{expand:true, flatten: true, src:"src/adminPortal/envVariables/develop/server.js", dest: clientEnvVariablesTemp}
				]
			},
			adminPortalEnvVariablesProduction: {
				files: [
					{expand:true, flatten: true, src:"src/adminPortal/envVariables/production/server.js", dest: clientEnvVariablesTemp}
				]
			},
			domainWebsiteServer: {
				files: [
					{expand: true, cwd: "src/domainWebsite/", src: ["server.js"], dest: domainWebsiteBuild},
				]
			},
			domainWebsiteJs: {
				files: [
					{expand: true, cwd: tempJs, src: ["app.js", "app.min.js", "app.min.js.map"], dest: domainWebsiteJs}
				]
			},
			domainWebsiteCss: {
				files: [
					{expand:true, flatten: true, src:[npmCssFiles], dest: domainWebsiteCss},
					{expand:true, cwd: domainWebsiteTemp, src: ["css/**"], dest: domainWebsiteWWW}

				]
			},
			domainWebsiteViews: {
				files:[
					{expand: true, flatten: true, src: ["src/domainWebsite/index.html"], dest: domainWebsiteWWW},
					{expand: true, cwd: "src/domainWebsite/", src: ["views/**"], dest:domainWebsiteWWW}
				]
			}
		},
		clean: {
			adminPortal: {
				src: ["build/adminPortal/public/**", "build/temp/**"]
			},
			domainWebsite: {
				src: [domainWebsiteWWW + "**", "build/temp/**"]
			}
		},
		sass: {
			adminPortal: {
				src: 'src/adminPortal/sass/main.scss',
				dest: adminPortalTempCss + 'main.css'
			},
			domainWebsite: {
					src: 'src/domainWebsite/sass/main.scss',
					dest: domainWebsiteTempCss + 'main.css'
			}

		},
		cssmin: {
			target: {
				files: [
					{
						expand: true,
						cwd: adminPortalTempCss,
						src: ['*.css', '!*.min.css'],
						dest: adminPortalCss,
						ext: '.min.css',
					}, {
						expand: true,
						cwd: domainWebsiteTempCss,
						src: ['*.css', '!*.min.css'],
						dest: domainWebsiteCss,
						ext: '.min.css'

					}
				]
			}
		},
		tape: {
			local: testFiles,
		},

	});
	require('load-grunt-tasks')(grunt);
};
