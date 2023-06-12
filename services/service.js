const User = require("../models/users");
const db = require("../configs/config");

const handleError = (res, err) => {
	res.status(500).send(err.message);
};

async function insertUser(req, res) {
	if (req.headers["content-type"] === "application/json") {
		const user = new User(req.body);
		user
			.save()
			.then(() => {
				res.status(201).json(`Данные успешно отправлены!`);
			})
			.catch((err) => handleError(res, err));
	}else res.status(400).json("Данные должны быть в формате json");
}

async function showUser(req, res) {
	User.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => handleError(res, err));
}

async function findbyidUser(req, res) {
	const id = req.params.id;
	User.findById(id)
		.then((result) => {
			if(result){
				res.status(200).json(result);
			}else res.status(400).json("Такого документа не существует");
		})
		.catch((err) => {
			res.status(404).json("Такого документа не существует!");
		});
}

module.exports = { insertUser, showUser, findbyidUser };