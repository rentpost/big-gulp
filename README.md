BIG Gulp (beta)
========

A micro-framework for BIG [Gulp](http://gulpjs.com) projects that could benefit from some abstraction and organization.

[![Big gulps, huh?](http://www.dumbcountdown.com/uploads/3/2/0/5/32055191/7859786_orig.jpg)](https://youtu.be/N_j5tDuakKU)


Getting Started
========

Getting going with BIG Gulp is really simple.  Start off by installing the `gulp` and `rentpost/big-gulp` npm modules.

```sh
cd /path/to/your/gulp/app
npm install gulp
npm install rentpost/big-gulp
```

Next, be sure to add something similar to the following to your `package.json` file inside your app directory.

*Note that within the autoload property, you can define directories for autoloading.  A value of `true` for a "namespace" like "tasks" will load all task files within that directory.  Optionally, you can selectively load in modules by defining an object collection with a value of `true` where the "key" is the name of the module/file.*

```json
{
    "_BigGulp": {
		"config": {
			"absolutePath": "/path/to/your/gulp/app",
			"logPath": "/path/to/your/gulp/app/logs",
			"minLogLevel": "debug"
		},
		"autoload": {
			"tasks": true,
			"node_modules": {
				"gulp": true,
				"gulp-sourcemaps": true,
				"gulp-sass": true,
				"gulp-uglify": true,
			}
		}
	}
}
```

After setting up your config, add the following to your `gulpfile.js` to initialize and load BIG Gulp.

```javascript
var BigGulp = require("big-gulp")(module),
	app = BigGulp.load();
```

Once you've done this, you can now start playing.  If you autoloaded a "tasks" namespace, the tasks within this directory get overloaded and pass the `app` for accessing your various modules.

Below is an example of a task.

*Note the use of the `app.config`. Additional config properties can be added to the config in your `package.json`. If you choose to do so, please use underscored property keys to avoid any future conflicts.*

```javascript
/**
 * LINT's the necessary assets
 */
module.exports = {

	/**
	 * Run the task
	 * @param {object} app
	 */
	run: function(app) {
	    return app.modules.gulp.src(app.config.absolutePath + 'src/*.js')
			.pipe(app.modules.gulpJshint())
			.pipe(app.modules.gulpJshint.reporter('default'));
	}
};
```


Dependencies & Credits
========

 * [gulp](http://gulpjs.com/) for providing some amazing build tools.
 * [jwerle](https://github.com/jwerle/node-auto-loader) for a nice autoloader for node modules.
 * [lodash](http://lodash.com) becasue it's awesome!
 * [indexzero](https://github.com/indexzero/node-pkginfo) for a nice tool for locating, reading and parsing package.json.
 * [ianstormtaylor](https://github.com/ianstormtaylor/to-camel-case) for making it easy to camelCase random strings.
 * [flatiron](https://github.com/flatiron/winston) for their fantastic work on Winston, a kick-ass logging lib.
 

License
========
The MIT License (MIT)

Copyright &copy; 2014 - RentPost, Inc.