const _ = require("lodash");
const { Schema } = require("mongoose");
const option = require("./common/option");

const STATUS_ACTIVE = "active", STATUS_PENDING = "pending", STATUS_DISABLED = "disabled", STATUS_DELETED = "deleted";
const STATUS_ENUM = [ STATUS_ACTIVE, STATUS_PENDING, STATUS_DISABLED, STATUS_DELETED ];

let schema = new Schema({
	_id: Schema.ObjectId,
	orgId: {
		type: Schema.ObjectId,
		required: true
	},
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		bcrypt: true,
		required: true
	},
	status: {
		type: String,
		enum: STATUS_ENUM,
		default: STATUS_PENDING
	},
	phone: {
		type: String,
		default: null
	}
}, _.merge({ collection: "users" }, option));
schema.plugin(require("mongoose-bcrypt"));
module.exports = schema;