const express = require('express');
const port = 3000;
const cors = require('cors');
const app = express();

const { createServer } = require('node:http');
const chatRouter = require('./routes/chat.routes');
const server = createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*', // Permitir conexiones desde cualquier origen
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
  }
});

app.use(cors());
app.use(express.json());
app.use('/api/chat', chatRouter);

//salida de conexión (se ven los mensajes conectandolo con eventos del cliente)

io.on('connection', socket => {
  console.log('a user is connected');

  // Cuando un usuario se conecta con su email recibe esta info
  socket.on('user_connected', data => {
    const newUser = {
      email: data.email
    };

    // console.log(`Usuario conectado: ${newUser}`);
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

//historial de chat

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
