import ChatContainer from '../../components/chatContainer/ChatContainer';
import { useEffect, useState, useContext } from 'react';
import socket from '../../../lib/socket/socket';
import { AuthContext } from '../../lib/contexts/authContext';

const Chat = () => {
	const [messages, setMessages] = useState([]); //aqui se guardan los mensajes
	const { user, loading } = useContext(AuthContext);
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		if (user) {
			socket.on('connect', () => {
				setIsConnected(true); //hay usuario, hay conexion
				socket.emit('user_connected', { email: user.email }); //mando esto
				console.log('Usuario conectado:', user.email);
			});

			socket.on('chat_message', data => {
				setMessages(messages => [...messages, data]); //actualizo los mensajes con el nuevo mensaje
			});

			socket.on('disconnect', () => {
				setIsConnected(false); //si se desconecta, pongo isConnected a false
			});
		}

		return () => {
			socket.off('connect');
			socket.off('chat_message');
			socket.off('disconnect');
		};
	}, [user]);
	// dependencia

	return (
		<div>
			<div>
				<h1>{isConnected ? 'ONLINE' : 'OFFLINE'} </h1>

				<ChatContainer sendMessage={sendMessage} messages={messages} />
			</div>
			{/* <div>
				<h3>Usuarios Online ({onlineUsers.length})</h3>
				<ul>
					{onlineUsers.map(user => (
						<li key={user.socketId}>{user.email}</li>
					))}
				</ul>
			</div> */}
		</div>
	);

	const sendMessage = message => {
		if (message && socket) {
			//si hay mensaje y socket
			socket.emit('chat_message', {
				message: message,
				user: user.email
			});
		}
	};
};
export default Chat;
