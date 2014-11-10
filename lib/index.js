"use strict";

global._ = require("lodash");


module.exports = BigGulp;


/**
 * BigGulp framework constructor
 * @param {object} appModule
 * @constructor
 */
function BigGulp(appModule) {
	var self = this;

	if(!(this instanceof BigGulp))
		return new BigGulp(appModule);

	/** @private */
	self._core = require("./core");
	self._app = {};
	self._appModule = appModule;
	self._packageInfo = {};

	self._init();
}


/** @property {object} utilities */
BigGulp.prototype.utilities = require("./utilities");

/** @property {object} Chalk */
BigGulp.prototype.utilities.chalk = require("chalk");

/** @property {object} Logger */
BigGulp.prototype.logger = {};

BigGulp.prototype.gulp = {};


/**
 * Initialize everything for BigGulp
 * @private
 */
BigGulp.prototype._init = function() {
	require("pkginfo")(this._appModule);

	//get the package.json data
	this._packageInfo = this._appModule.exports;

	//construct our Logger
	this.logger = new this._core.Logger(this);
};


/**
 * Sets aliases for certain things
 * @private
 */
BigGulp.prototype._setAliases = function() {
	this.modules = this.nodeModules;
	this.config = this._packageInfo._BigGulp.config;
	this.gulp = this._app.modules.gulp;
};


/**
 * Loads up the BigGulp app
 * @param {string|void} glob
 * @param {array|void} tasks
 * @returns {*|void}
 */
BigGulp.prototype.watch = function(glob, tasks) {
	var Watcher = new this._core.Watcher(this),
		globs = {};

	//checks to see if we passed something in. If so, use it, otherwise, bootstrap watching.
	if(_.size(glob) || _.size(tasks)) {
		globs[glob] = tasks;
	} else {
		globs = this._packageInfo._BigGulp.watch
	}

	_.forEach(globs, function(tasks, glob) {
		Watcher.watch(glob, tasks);
	});

	return this;
};


/**
 * Loads up the BigGulp app
 * @returns {*|void}
 */
BigGulp.prototype.load = function() {
	this.logger.info("Big Gulp loading up...");

	var Loader = new this._core.Loader(this);

	this._app = Loader.load(this.getInfo(false).autoload);

	this._setAliases();

	return this._app;
};


/**
 * Returns the package information
 * @param {boolean} all
 * @returns {object}
 */
BigGulp.prototype.getInfo = function(all) {
	all = all || false;

	return (all) ? this._packageInfo : this._packageInfo._BigGulp;
};