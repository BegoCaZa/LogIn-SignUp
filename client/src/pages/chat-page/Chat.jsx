import ChatContainer from '../../components/chatContainer/ChatContainer';
import { useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../../lib/contexts/authContext';

const Chat = () => {
	const [isConnected, setIsConnected] = useState(false);
	const [messages, setMessages] = useState([]); //aqui se guardan los mensajes
	const [newMessage, setNewMessage] = useState(''); //aqui se guarda el mensaje que se escribe
	const [socket, setSocket] = useState(null);
	const { user } = useContext(AuthContext); //obtiene el usuario del contexto de autenticación
	const [onlineUsers, setOnlineUsers] = useState([]); //aqui se guarda el contador de usuarios conectados

	useEffect(() => {
		if (user) {
			const newSocket = io('http://localhost:3000');
			setSocket(newSocket);

			newSocket.on('connect', () => {
				setIsConnected(true);
				// Enviar email del usuario al conectarse
				newSocket.emit('user_connected', { email: user.email });
				console.log(user);
			});

			newSocket.on('users_updated', users => {
				setOnlineUsers(users);
			});

			newSocket.on('chat_message', data => {
				setMessages(messages => [...messages, data]);
			});

			return () => {
				newSocket.disconnect();
			};
		}
	}, [user]);

	const sendMessage = () => {
		if (newMessage && socket) {
			socket.emit('chat_message', { message: newMessage });
			setNewMessage(''); //limpiar el input
		}
	};

	return (
		<div>
			<div>
				<h1>{isConnected ? 'ONLINE' : 'OFFLINE'} </h1>

				<ChatContainer
					setNewMessage={setNewMessage}
					sendMessage={sendMessage}
					messages={messages}
					newMessage={newMessage}
				/>
			</div>
			<div>
				<h3>Usuarios Online ({onlineUsers.length})</h3>
				<ul>
					{onlineUsers.map(user => (
						<li key={user.socketId}>{user.email}</li>
					))}
				</ul>
			</div>
		</div>
	);
};
export default Chat;
