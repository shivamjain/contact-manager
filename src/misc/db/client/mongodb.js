const _ = require("lodash");
const mongoose = require("mongoose");

class MongoDB {
	constructor(config) {
		this.uri = `mongodb://${config.host}/${config.db}?${config.options}`;
		if (_.size(config.user) > 0 && _.size(config.pass) > 0) {
			this.uri = `mongodb://${config.user}:${config.pass}@${config.host}/${config.db}?${config.options}`;
		}
	}

	createConnection(options = {}) {
		let conn = mongoose.createConnection(this.uri, _.merge({useNewUrlParser: true}, options));
		return conn;
	}
}

module.exports = MongoDB;