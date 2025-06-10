const express = require('express');
const port = 3000;
const cors = require('cors');
const app = express();
// const { join } = require('node:path');
// const { Server } = require('socket.io');

const { createServer } = require('node:http');
const server = createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*' // Permitir conexiones desde cualquier origen
  }
});

app.use(cors());
app.use(express.json());

//salida de conexión (se ven los mensajes conectandolo con eventos del cliente)
let userCount = 0;
io.on('connection', socket => {
  console.log('a user is connected');
  userCount++;
  const userName = `User ${userCount}`;

  socket.emit('user_assigned', { userName, userCount }); //envía el nombre de usuario al cliente

  //igual al del cliente
  socket.on('chat_message', data => {
    //apenas le llega el mensaje, lo emite a todos los clientes conectados
    io.emit('chat_message', {
      user: userName, //obtiene el nombre de usuario del socket conectado
      message: data.message,
      userId: socket.id //envía el ID del socket para identificar al usuario
    });
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
