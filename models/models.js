const db = require("../configs/config");

const schema = new db.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		modelname: {
			type: String,
			required: true,
			trim: true,
		},
		modeltype: {
			type: String,
			required: true,
			trim: true,
		},
		object: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		comments: {
			type: String,
			required: true,
			trim: true,
		},
		data: {
			type: Date,
			default: Date.now(),
		},
		datachange: {
			type: Date,
			default: Date.now(),
		}
	},
	{ versionKey: false }
);

module.exports = db.model("model", schema);