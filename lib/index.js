"use strict";

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


	/** @property {object} utilities */
	this.utilities = require("./utilities");
}


/**
 * Loads up the BigGulp app
 * @returns {*|void}
 */
BigGulp.prototype.load = function() {
	var Loader = new this._core.Loader();

	return Loader.load();
};


/**
 * Get's the package info for the BigGulp app
 * @returns {pkginfo|exports}
 */
BigGulp.prototype.info = function() {
	var pkgInfo = require("pkginfo")(this._appModule);
	return this._appModule.exports;
};