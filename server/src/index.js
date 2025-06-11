const express = require('express');
const port = 3000;
const cors = require('cors');
const app = express();

const { createServer } = require('node:http');
const server = createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*' // Permitir conexiones desde cualquier origen
  }
});

app.use(cors());
app.use(express.json());

let connectedUsers = []; //variable para contar los usuarios conectados

//salida de conexión (se ven los mensajes conectandolo con eventos del cliente)

io.on('connection', socket => {
  console.log('a user is connected');

  // Cuando un usuario se conecta con su email
  socket.on('user_connected', data => {
    const newUser = {
      email: data.email,
      socketId: socket.id
    };

    connectedUsers.push(newUser);
    console.log(`Usuario conectado: ${data.email}`);

    // Enviar lista actualizada a todos los clientes
    io.emit('users_updated', connectedUsers);
  });

  // Manejo de mensajes del chat
  socket.on('chat_message', data => {
    const user = connectedUsers.find(u => u.socketId === socket.id);

    io.emit('chat_message', {
      user: user ? user.email : 'Usuario desconocido',
      message: data.message,
      userId: socket.id
    });
  });

  // Cuando un usuario se desconecta
  socket.on('disconnect', () => {
    console.log('user disconnected');

    // Encontrar y quitar el usuario del array
    const userIndex = connectedUsers.findIndex(u => u.socketId === socket.id);
    if (userIndex !== -1) {
      const disconnectedUser = connectedUsers[userIndex];
      connectedUsers = connectedUsers.filter(u => u.socketId !== socket.id);
      console.log(`Usuario desconectado: ${disconnectedUser.email}`);
    }

    // Enviar lista actualizada a todos los clientes
    io.emit('users_updated', connectedUsers);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
