"use strict";

var BIGGulp = require("./core");

function load() {
	var Loader = new BIGGulp.Loader();
	return Loader.load();
}

module.exports = {
	utilities: require("./utilities"),
	load: load
};