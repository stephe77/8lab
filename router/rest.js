const express = require("express");
const jsonParser = express.json();
const router = express.Router();

let user = { user_agent: 0 };
let com = '';

function validation(req, res, next){
	if(JSON.stringify(req.body) == '{}'){
		next(error);
	}else next();
}

function checkAuthorization(req, res, next){
	const apiKey = req.query.key;
	if (apiKey !== '123'){
		next(err);
	}
	else next();
}

router.get("/", (req, res) => {
  res.send("Привет!");
});

router.post('/login', jsonParser, validation, checkAuthorization, (req, res) => {
	res.send('Успешно!');
});

router.get("/stats", (req, res) => {
	user.user_agent++;
  res.send(`<table>
  			<tr><td>User-agent:</td>
  			<td>Request:</td></tr>
  			<tr><td>${req.headers["user-agent"]}</td>
  			<td>${user.user_agent}</td></tr>
  			</table>`);
});

router.get("/comments", (req, res) => {
  res.send(com);
});

// router.post("/comments", jsonParser, validation, (req, res) => {
//   console.log(req.body);
// 	com += JSON.stringify(req.body);
// 	res.send('Спасибо, за вашу отзывчивость!');
// });
module.exports = router;