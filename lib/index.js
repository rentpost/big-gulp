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
	self._appModule = appModule;
	self._packageInfo = {};

	/** @property {object} utilities */
	this.utilities = require("./utilities");

	self._init();
}


/**
 * Initialize everything for BigGulp
 * @private
 */
BigGulp.prototype._init = function() {
	var pkgInfo = require("pkginfo")(this._appModule);
	this._packageInfo = this._appModule.exports;
};


/**
 * Sets aliases for certain things
 * @private
 */
BigGulp.prototype._setAliases = function() {
	this.modules = this.nodeModules;
};


/**
 * Loads up the BigGulp app
 * @returns {*|void}
 */
BigGulp.prototype.load = function() {
	var Loader = new this._core.Loader(this),
		BigGulpApp = Loader.load(this.getInfo(false).autoload);

	this._setAliases();

	return BigGulpApp;
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