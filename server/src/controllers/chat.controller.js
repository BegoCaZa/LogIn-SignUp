const fs = require('fs/promises');
const path = require('path');

const chatController = {};

const chatFilePath = path.resolve(__dirname, '../../data/history.json');

//READ messages

chatController.readAllMessages = async (req, res) => {
  try {
    const data = await fs.readFile(chatFilePath);
    const jsonData = JSON.parse(data);
    res.send(jsonData);
  } catch (err) {
    console.error('Error al leer el archivo', err);
    res.status(500).send('Error al leer el archivpo');
  }
};

//recibe los mensajes al enviar
chatController.saveMessage = async (req, res) => {
  const messageHistory = req.body;
  try {
    const data = await fs.readFile(chatFilePath);
    const jsonData = await JSON.parse(data);

    jsonData.push(messageHistory);

    await fs.writeFile(chatFilePath, JSON.stringify(jsonData));
    res.send(messageHistory);
  } catch (err) {
    console.error('error al crear historial', err);
    res.status(500).send('Error en el servidor');
  }
};

module.exports = chatController;
