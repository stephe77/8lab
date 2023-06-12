const express = require('express');
const {insertUser, showUser, findbyidUser } = require('../services/service');
const {giveAPIkey, delAPIkey, showModels, showModelId, insertModel, updateModel, delModelId, authorization} = require('../services/CRUDservice');
const jsonParser = express.json();
const controller = express.Router();

controller.post('/comments', jsonParser, insertUser);
controller.get('/comments', showUser);
controller.get('/comments/:id', findbyidUser);

controller.post('/api', jsonParser, giveAPIkey);
controller.delete('/api/:id', delAPIkey);

controller.get('/models', showModels);
controller.get('/models/:id', showModelId);
controller.post('/models', jsonParser, authorization, insertModel);
controller.put('/models/:id', jsonParser, authorization, updateModel);
controller.delete('/models/:id', authorization, delModelId);

module.exports = controller;