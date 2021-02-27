const mongoose = require("mongoose");

class Util {
	constructor() { }
	
	static generateMongoId() {
		return mongoose.Types.ObjectId();
	}
}

module.exports = Util;