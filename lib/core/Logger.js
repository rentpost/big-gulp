var winston = require("winston");
var moment = require("moment");


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

	//alias
	self.Chalk = this._BigGulp.utilities.Chalk;

	this._setupWinston();
}


/** @property {object} Winston */
Logger.prototype.default = {};


/**
 * Setup Winston for our purposes, associate files.
 * @private
 */
Logger.prototype._setupWinston = function() {
	var self = this;

	winston.cli();
	winston.addColors(this._logColors);

	//default Winston instance
	winston.loggers.add("default", {
		console: {
			label: self.Chalk.grey.underline("big-gulp"),
			level: self._minLogLevel,
			timestamp: function() {
				var time = moment().format("HH:mm:ss");
				return "[" + self.Chalk.grey(time) + "]";
			},
			colorize: true,
			handleExceptions: false
		},
		file: {
			filename: self._logPath + "/" + self._logFilenames.default,
			level: self._minLogLevel,
			timestamp: function() {
				return moment().format("YYYY-MM-DD HH:mm:ss");
			},
			handleExceptions: false
		}
	});

	this.default = winston.loggers.get("default");
	this.default.setLevels(self._logLevels); //use syslog log level defaults (same as PHP PSR)
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
 * Examines the call stack and returns a string indicating
 * the file and line number of the n'th previous ancestor call.
 * this works in chrome, and should work in nodejs as well.
 *
 * @param n : int (default: n=1) - the number of calls to trace up the
 *   stack from the current call.  `n=0` gives you your current file/line.
 *  `n=1` gives the file/line that called you.
 * @returns {exports.getAllInfo.stack|*|stack}
 * @private
*/
Logger.prototype._traceCaller = function(n) {
	if(isNaN(n) || n<0) n=1;
	n+=1;
	var s = (new Error()).stack
	, a=s.indexOf('\n',5);
	while(n--) {
	a=s.indexOf('\n',a+1);
	if( a<0 ) { a=s.lastIndexOf('\n',s.length); break;}
	}
	b=s.indexOf('\n',a+1); if( b<0 ) b=s.length;
	a=Math.max(s.lastIndexOf(' ',b), s.lastIndexOf('/',b));
	b=s.lastIndexOf(':',b);
	s=s.substring(a+1,b);
	return s;
};


/**
 * Handles the actual logs.
 * @info logger.log() does not include callsite, only logger.{level}().
 * @param {string} logLevel
 * @param {string} message
 * @private
 */
Logger.prototype._handleLog = function(logLevel, message) {
	this.default.log(logLevel, message);
	return this;
};


/**
 * System is unusable.
 * @param message
 */
Logger.prototype.emergency = function(message) {
	this._handleLog("emergency", message);
	return this;
};


/**
 * Action must be taken immediately.
 * @param message
 */
Logger.prototype.alert = function(message) {
	this._handleLog("alert", message);
	return this;
};


/**
 * Critical conditions.
 * @param message
 */
Logger.prototype.critical = function(message) {
	this._handleLog("critical", message);
	return this;
};


/**
 * Runtime errors that do not require immediate action but should typically be logged and monitored.
 * @param message
 */
Logger.prototype.error = function(message) {
	this._handleLog("error", message);
	return this;
};


/**
 * Exceptional occurrences that are not errors.
 * @param message
 */
Logger.prototype.warning = function(message) {
	this._handleLog("warning", message);
	return this;
};


/**
 * Normal but significant events.
 * @param message
 */
Logger.prototype.notice = function(message) {
	this._handleLog("notice", message);
	return this;
};


/**
 * Interesting events.
 * @param message
 */
Logger.prototype.info = function(message) {
	this._handleLog("info", message);
	return this;
};


/**
 * Detailed debug information.
 * @param message
 */
Logger.prototype.debug = function(message) {
	if(_.isString(message))
		this._handleLog("debug", message + this.Chalk.grey("  | " + this._traceCaller(1)));
	else
		this._handleLog("debug", message)._handleLog("debug", this.Chalk.grey("^^ -> " + this._traceCaller(1)))

	return this;
};