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

//salida de conexión (se ven los mensajes conectandolo con eventos del cliente)

io.on('connection', socket => {
  console.log('a user is connected');

  // Cuando un usuario se conecta con su email recibe esta info
  socket.on('user_connected', data => {
    const newUser = {
      email: data.email
    };

    console.log(`Usuario conectado: ${data.email}`);
  });

  // Manejo de mensajes del chat
  socket.on('chat_message', data => {
    const user = {
      email: data.user
    };

    io.emit('chat_message', {
      user: user.email,
      message: data.message
    });
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
