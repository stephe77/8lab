const express = require('express');
const {insertUser, showUser, findbyidUser } = require('../services/service');
const jsonParser = express.json();
const controller = express.Router();

controller.post('/comments', jsonParser, insertUser);
controller.get('/comments', showUser);
controller.get('/comments/:id', findbyidUser);

module.exports = controller;