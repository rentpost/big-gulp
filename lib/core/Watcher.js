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

	self.gulp = BigGulp.gulp;
	self.logger = BigGulp.logger;
	self.chalk = BigGulp.utilities.chalk;
	self.gulpWatch = require("gulp-watch");
	self.RunSequence = require("run-sequence")(BigGulp.gulp);

	/** @private */
	self._srcPath = this._BigGulp._packageInfo._BigGulp.config.absolutePath + "/src/";
}


/**
 * Registers and initializes watching of files
 * @param {string} glob
 * @param {array} tasks
 */
Watcher.prototype.watch = function(glob, tasks) {
	var self = this;

	if(!_.size(glob) || !_.isString(glob))
		throw new Error("You must pass a valid glob string for watching if you pass tasks to be executed");

	if(!_.size(tasks) || !_.isArray(tasks))
		throw new Error("You must pass a task array to fire for each glob being watched.");

	self.logger.info("Watching for file changes within " + self.chalk.magenta([glob]) + " to execute " + _(tasks).join(",") + " task(s).");

	console.log(tasks);

	this.gulpWatch(glob, function(files, cb) {
		self.RunSequence.run.apply(self.RunSequence, tasks.concat(cb));
			//bind(self.RunSequence, cb).apply(self.RunSequence, tasks);
	});

	//watcher.on("change", function(event) {
	//	self.logger.info("File " + event.path + " was " + event.type + ", running tasks...");
	//});
};


Watcher.prototype.cleanUp = function() {
	self.logger.info("Cleaning up Watcher...");
};