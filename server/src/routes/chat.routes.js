const express = require('express');
const chatController = require('../controllers/chat.controller');
const chatRouter = express.Router();

//rutas
chatRouter.get('/', chatController.readAllMessages);
chatRouter.post('/', chatController.saveMessage);

module.exports = chatRouter;
