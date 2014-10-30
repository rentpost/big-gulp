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


	/** @property {object} packageInfo */
	this.packageInfo = {};

	/** @property {object} utilities */
	this.utilities = require("./utilities");

	self._init();
}


/**
 *
 * @private
 */
BigGulp.prototype._init = function() {
	var pkgInfo = require("pkginfo")(this._appModule);
	this.packageInfo = this._appModule.exports;
};


/**
 * Loads up the BigGulp app
 * @returns {*|void}
 */
BigGulp.prototype.load = function() {
	var Loader = new this._core.Loader();

	return Loader.load();
};