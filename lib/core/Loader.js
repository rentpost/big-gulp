module.exports = Loader;

/**
 * Loads in various files and modules
 * @constructor
 */
function Loader() {
	if(!(this instanceof Loader))
		return new Loader();

	this.modules = [];
}


/**
 * Performs a basic load
 */
Loader.prototype.getModules = function () {

};


/**
 * Performs a basic load
 */
Loader.prototype.load = function () {
	console.log("loading");
};