const express = require('express');
const chatController = require('../controllers/chat.controller');
const chatRouter = express.Router();

//rutas
chatRouter.get('/', chatController.getAllMessages);
chatRouter.post('/', chatController.saveMessage);
chatRouter.delete('/', chatController.deleteMessages);

module.exports = chatRouter;
