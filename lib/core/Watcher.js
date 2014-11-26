module.exports = Watcher;


/**
 * Sets gulp to watch the appropriate globs
 * @parm {object} BigGulp - the main BigGulp app object
 * @constructor
 */
function Watcher(BigGulp) {
	var self = this;

	if(!(this instanceof Watcher))
		return new Watcher();

	/** @private */
	self._BigGulp = BigGulp;

	self.Gulp = BigGulp.Gulp;
	self.Logger = BigGulp.Logger;
	self.Chalk = BigGulp.utilities.Chalk;

	/** @private */
	self._srcPath = this._BigGulp._packageInfo._BigGulp.config.absolutePath + "/src/";
	self._tasks = [];
}


/**
 * Registers and initializes watching of files
 * @param {string|array} glob
 * @param {array} tasks
 */
Watcher.prototype.watch = function(glob, tasks) {
	var self = this;

	self._tasks = tasks; //assign to Watcher

	if(!_.size(glob) && (!_.isString(glob) || !_.isArray(glob)))
		throw new Error("You must pass a valid glob string or array of strings for watching, if you pass tasks to be executed");

	if(!_.size(tasks) || !_.isArray(tasks))
		throw new Error("You must pass a task array to fire for each glob being watched.");

	self.Gulp.watch(glob, tasks);
};


/**
 * Clean things up
 * @todo
 */
Watcher.prototype.cleanUp = function() {
	this.Logger.info("Cleaning up Watcher...");
};