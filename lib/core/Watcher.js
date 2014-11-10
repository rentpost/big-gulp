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

	/** @private */
	self._srcPath = this._BigGulp._packageInfo._BigGulp.config.absolutePath + "/src/";
}


/**
 * Registers and initializes watching of files
 * @param {string} glob
 * @param {array} tasks
 */
Watcher.prototype.watch = function(glob, tasks) {
	if(!_.size(glob) || !_.isString(glob))
		throw new Error("You must pass a valid glob string for watching if you pass tasks to be executed");

	if(!_.size(tasks) || !_.isArray(tasks))
		throw new Error("You must pass a task array to fire for each glob being watched.");

	this._BigGulp.logger.info("Watching for file changes within " + [glob] + " and executing " + _(tasks).join(","));
};