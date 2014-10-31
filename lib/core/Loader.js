var AutoLoader = require("auto-loader");
var camel = require("to-camel-case");


module.exports = Loader;


/**
 * Loads in various files and modules
 * @parm {object} BigGulp - the main BigGulp app object
 * @constructor
 */
function Loader(BigGulp) {
	var self = this;

	if(!(this instanceof Loader))
		return new Loader(BigGulp);

	/** @private */
	self._BigGulp = BigGulp;
	self._moduleList = {};
	self._modules = {};
	self._appPath = this._BigGulp._packageInfo._BigGulp.config.absolutePath;
}


/**
 * Initializes all the tasks and registers them with Gulp
 * @private
 */
Loader.prototype._initTasks = function() {
	var BigGulp = this._BigGulp,
		BaseTask = this._BigGulp._core.BaseTask;

	_.forEach(this._BigGulp.tasks, function(task, taskName) {
		task = _.merge(new BaseTask(), task);
		task.init(BigGulp, task, taskName);
	});
};


/**
 * Performs a basic load
 * @param {object} moduleList
 */
Loader.prototype.load = function(moduleList) {
	this._moduleList = moduleList;

	var Loader = this;

	_.forEach(this._moduleList, function(result, namespace) {
		if(_.isObject(result) && _.size(result) > 0) {
			Loader._BigGulp[camel(namespace)] = {};

			_.forEach(result, function(result, moduleName) {
				if(result === true) {
					Loader._BigGulp[camel(namespace)][camel(moduleName)] = require(Loader._appPath + namespace + "/" + moduleName);
				}
			});

		} else if(result === true) {
			Loader._BigGulp[namespace] = AutoLoader.load(Loader._appPath + namespace);
		}
	});

	this._initTasks();

	return this._BigGulp;
};