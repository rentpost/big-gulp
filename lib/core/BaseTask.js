function BaseTask() {
	/**
	 * Task Dependencies
	 * @param {Array} deps
	 */
	this.deps = null;
}


/**
 * Initialize the task
 * @param {Object} app
 * @param {Object} task
 * @param {string} taskName
 */
BaseTask.prototype.init = function (app, task, taskName) {
	task.deps = (task.deps.length) ? task.deps : null;

	app.modules.gulp.task(taskName, task.deps, function () {
			task.run(app);
		}
	);
};


/**
 * This actually executes and runs the task
 *
 * @note this must be defined within the task file directly
 */
BaseTask.prototype.run = function (app) {
	console.log("You must define the run method within your task");
};

module.exports = BaseTask;