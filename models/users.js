const db = require("../configs/config");

const schema = new db.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		text: {
			type: String,
			required: true,
			trim: true,
		},
		data: {
			type: Date,
			default: Date.now(),
		},
	},
	{ versionKey: false }
);

module.exports = db.model("user", schema);