"use strict";

var BIGGulp = {
	utilities: require("auto-loader").load(__dirname + "/utilities/")
};


BIGGulp.load = function() {
	console.log("loading");
};

module.exports = BIGGulp;