const db = require("../configs/config");

const schema = new db.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		key: {
			type: String,
		}
	},
	{ versionKey: false }
);

module.exports = db.model("apikey", schema);