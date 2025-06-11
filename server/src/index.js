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

let usersOnline = []; //variable para contar los usuarios conectados

//salida de conexión (se ven los mensajes conectandolo con eventos del cliente)

io.on('connection', socket => {
  console.log('a user is connected');

  // Cuando un usuario se conecta con su email
  socket.on('user_connected', data => {
    const newUser = {
      email: data.email,
      socketId: socket.id
    };

    usersOnline.push(newUser);
    console.log(`Usuario conectado: ${data.email}`);

    // Enviar lista actualizada a todos los clientes
    io.emit('users_updated', usersOnline);
  });

  // Manejo de mensajes del chat
  socket.on('chat_message', data => {
    const user = usersOnline.find(user => user.socketId === socket.id);

    io.emit('chat_message', {
      user: user ? user.email : 'Usuario desconocido',
      message: data.message,
      userId: socket.id
    });
  });

  // Cuando un usuario se desconecta
  socket.on('disconnect', () => {
    // Encontrar y quitar el usuario del array
    const userIndex = usersOnline.findIndex(
      user => user.socketId === socket.id
    );
    if (userIndex === 0) {
      usersOnline = usersOnline.filter(user => user.socketId !== socket.id);
    }

    // Enviar lista actualizada a todos los clientes
    io.emit('users_updated', usersOnline);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
