const APIkey = require("../models/APIkeys");
const Model = require("../models/models");
const db = require("../configs/config");
const crypto = require("crypto");

const handleError = (res, err) => {
	res.status(500).send(err.message);
};

function authorization(req, res, next) {
	try {
		const apiKey = req.query.key;
		APIkey.findOne({ key: apiKey })
			.then((result) => {
				if (result) {
					next();
				} else {
					console.log(apiKey);
					const error = new Error("Доступ запрещен");
					error.statusCode = 401;
					throw error;
				}
			})
			.catch((err) => {
				next(err);
			});
	} catch (err) {
		next(err);
	}
}

async function giveAPIkey(req, res, next) {
	try {
		if (req.headers["content-type"] === "application/json") {
			const apikey = new APIkey(req.body);
			const newapikey = crypto.randomBytes(8).toString("hex");
			apikey.key = newapikey;

			apikey
				.save()
				.then(() => {
					res.status(201).json(newapikey);
				})
				.catch((err) => {
					next(err);
				});
		} else {
			const error = new Error("Данные должны быть в формате json");
			error.statusCode = 400;
			throw error;
		}
	} catch (err) {
		next(err);
	}
}

async function delAPIkey(req, res, next) {
	try {
		const id = req.params.id;

		APIkey.findOneAndDelete({ key: id })
			.then((result) => {
				if (result) {
					res.status(200).json("Данные успешно удалены");
				} else {
					console.log(apiKey);
					const error = new Error("Такого документа не существует");
					error.statusCode = 400;
					throw error;
				}
			})
			.catch((err) => {
				next(err);
			});
	} catch (err) {
		next(err);
	}
}

async function showModels(req, res, next) {
	try {
		Model.find({}, { modelname: 1, modeltype: 1 })
			.then((models) => {
				res.status(200).json(models);
			})
			.catch((err) => {
				next(err);
			});
	} catch (err) {
		next(err);
	}
}

async function showModelId(req, res, next) {
	try {
		const id = req.params.id;
		Model.findById(id)
			.then((result) => {
				if (result) {
					res.status(200).json(result);
				} else {
					const error = new Error("Такого документа не существует");
					error.statusCode = 400;
					throw error;
				}
			})
			.catch((err) => {
				next(err);
			});
	} catch (err) {
		next(err);
	}
}

async function insertModel(req, res, next) {
	try {
		if (req.headers["content-type"] === "application/json") {
			const model = new Model(req.body);
			model
				.save()
				.then(() => {
					res.status(201).json(`Данные успешно отправлены!`);
				})
				.catch((err) => {
					next(err);
				});
		} else {
			const error = new Error("Данные должны быть в формате json");
			error.statusCode = 400;
			throw error;
		}
	} catch (err) {
		next(err);
	}
}

async function updateModel(req, res, next) {
	try {
		if (req.headers["content-type"] === "application/json") {
			const id = req.params.id;
			body = req.body;
			Model.findByIdAndUpdate(id, {
				name: body.name,
				modelname: body.modelname,
				modeltype: body.modeltype,
				object: body.object,
				description: body.description,
				comments: body.comments,
				datachange: Date.now(),
			})
				.then((result) => {
					if (result) {
						res.status(200).json("Данные успешно обновлены");
					} else {
						const error = new Error("Такого документа не существует");
						error.statusCode = 400;
						throw error;
					}
				})
				.catch((err) => {
					next(err);
				});
		} else {
			const error = new Error("Данные должны быть в формате json");
			error.statusCode = 400;
			throw error;
		}
	} catch (err) {
		next(err);
	}
}

async function delModelId(req, res, next) {
	try {
		const id = req.params.id;
		Model.findByIdAndDelete(id)
			.then((result) => {
				if (result) {
					res.status(200).json("Данные успешно удалены");
				} else {
					const error = new Error("Такого документа не существует");
					error.statusCode = 400;
					throw error;
				}
			})
			.catch((err) => {
				next(err);
			});
	} catch (err) {
		next(err);
	}
}

module.exports = {
	giveAPIkey,
	delAPIkey,
	showModels,
	showModelId,
	insertModel,
	updateModel,
	delModelId,
	authorization,
};