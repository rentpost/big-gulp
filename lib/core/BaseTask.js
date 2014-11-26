module.exports = BaseTask;

/**
 * Base task which is merged with each gulp task
 * @returns {BaseTask}
 * @constructor
 */
function BaseTask() {
	if(!(this instanceof BaseTask))
		return new BaseTask();

	/**
	 * Task Dependencies
	 * @param {Array} deps
	 */
	this.deps = null;
	this.taskName = null;
}


/** @property {object} Gulp */
BaseTask.prototype.Gulp = null;


/**
 * Initializes the task with Gulp/Undertaker
 * @param app
 * @param task
 * @param taskName
 * @returns {BaseTask}
 */
BaseTask.prototype.init = function(app, task, taskName) {
	this.Gulp = this.Gulp || app.nodeModules.gulp;

	this.Gulp.set(taskName, function() {
		task.run(app);
	});

	return this;
};


/**
 * Adds dependencies to specific tasks with Gulp/Undertaker
 * @param {Object} app
 * @param {Object} task
 * @param {string} taskName
 */
BaseTask.prototype.registerDeps = function(app, task, taskName) {
	this.Gulp = this.Gulp || app.nodeModules.gulp;

	//if we have deps, register them
	if(_.size(task.deps)) {
		this.Gulp.task(taskName, this.Gulp.series(task.deps));
	}

	return this;
};


/**
 * This actually executes and runs the task
 *
 * @note this must be defined within the task file directly
 */
BaseTask.prototype.run = function(app) {
	app.logger.error("You must define the run method within your task");
};