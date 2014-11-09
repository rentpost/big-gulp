var winston = require("winston");


module.exports = Logger;


/**
 * Handles the logging for Big Gulp and exposes for gulp apps
 * @parm {object} BigGulp - the main BigGulp app object
 * @constructor
 */
function Logger(BigGulp) {
	var self = this;

	if(!(this instanceof Logger))
		return new Logger(BigGulp);

	/** @private */
	self._BigGulp = BigGulp;
	self._logPath = this._BigGulp._packageInfo._BigGulp.config.logPath;
	self._minLogLevel = this._BigGulp._packageInfo._BigGulp.config.minLogLevel;

	self._logFilenames = {
		default: "big-gulp.log"
	};

	this._setupWinston();
}

/** @property {object} Winston */
Logger.prototype.default = {};


/**
 * Setup Winston for our purposes, associate files.
 * @private
 */
Logger.prototype._setupWinston = function() {
	winston.cli();
	winston.addColors(this._logColors);

	//default Winston instance
	winston.loggers.add("big-gulp", {
		console: {
			label: "default",
			level: this._minLogLevel,
			colorize: true,
			handleExceptions: true
		},
		file: {
			filename: this._logPath + "/" + this._logFilenames.default,
			handleExceptions: true
		}
	});

	this.default = winston.loggers.get("big-gulp");
	this.default.cli(); //setup for CLI formatting with nodejitsu/require-analyzer
	this.default.setLevels(this._logLevels); //use syslog log level defaults (same as PHP PSR)
};


/**
 * An object of log levels
 * @returns {object}
 * @private
 */
Logger.prototype._logLevels = {
	debug: 0,
	info: 1,
	notice: 2,
	warning: 3,
	error: 4,
	critical: 5,
	alert: 6,
	emergency: 7
};


/**
 * An object of log level colors
 * @returns {object}
 * @private
 */
Logger.prototype._logColors = {
	debug: 'blue',
	info: 'green',
	notice: 'yellow',
	warning: 'red',
	error: 'red',
	critical: 'red',
	alert: 'yellow',
	emergency: 'red'
};


/**
 * Handles the actual logs.
 * @param {string} logLevel
 * @param {string} message
 * @private
 */
Logger.prototype._handleLog = function(logLevel, message) {
	this.default.log(logLevel, message)
};


/**
 * System is unusable.
 * @param message
 */
Logger.prototype.emergency = function(message) {
	this._handleLog("emergency", message)
};


/**
 * Action must be taken immediately.
 * @param message
 */
Logger.prototype.alert = function(message) {
	this._handleLog("alert", message)
};


/**
 * Critical conditions.
 * @param message
 */
Logger.prototype.critical = function(message) {
	this._handleLog("critical", message)
};


/**
 * Runtime errors that do not require immediate action but should typically be logged and monitored.
 * @param message
 */
Logger.prototype.error = function(message) {
	this._handleLog("error", message)
};


/**
 * Exceptional occurrences that are not errors.
 * @param message
 */
Logger.prototype.warning = function(message) {
	this._handleLog("warning", message)
};


/**
 * Normal but significant events.
 * @param message
 */
Logger.prototype.notice = function(message) {
	this._handleLog("notice", message)
};


/**
 * Interesting events.
 * @param message
 */
Logger.prototype.info = function(message) {
	this._handleLog("info", message)
};


/**
 * Detailed debug information.
 * @param message
 */
Logger.prototype.debug = function(message) {
	this._handleLog("debug", message)
};