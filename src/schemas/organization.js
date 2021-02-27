const _ = require("lodash");
const { Schema } = require("mongoose");
const option = require("./common/option");

const STATUS_ACTIVE = "active", STATUS_PENDING = "pending", STATUS_DISABLED = "disabled", STATUS_DELETED = "deleted";
const STATUS_ENUM = [ STATUS_ACTIVE, STATUS_PENDING, STATUS_DISABLED, STATUS_DELETED ];

let schema = new Schema({
    _id: {
        type: Schema.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    status: {
        type: String,
        enum: STATUS_ENUM,
        default: STATUS_PENDING
    }
}, _.merge({ collection: "organizations" }, option));

schema.statics.STATUS_ACTIVE = STATUS_ACTIVE;
schema.statics.STATUS_PENDING = STATUS_PENDING;
schema.statics.STATUS_DISABLED = STATUS_DISABLED;
schema.statics.STATUS_DELETED = STATUS_DELETED;

module.exports = schema;