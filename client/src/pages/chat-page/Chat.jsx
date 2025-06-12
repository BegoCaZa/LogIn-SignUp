import ChatContainer from '../../components/chatContainer/ChatContainer';
import { useEffect, useState, useContext } from 'react';
import socket from '../../lib/config/socket.config';
import { AuthContext } from '../../lib/contexts/authContext';

const Chat = () => {
	const [messages, setMessages] = useState([]); //aqui se guardan los mensajes
	const { user, loading } = useContext(AuthContext);

	useEffect(() => {
		if (user) {
			socket.on('connect', () => {
				socket.emit('user_connected', { email: user.email }); //mando esto
				console.log('Usuario conectado:', user.email);
			});

			socket.on('chat_message', data => {
				const updatedMessages = [...messages, data];
				setMessages(updatedMessages); //actualizo los mensajes con el nuevo mensaje
			});

			socket.on('disconnect', () => {
				console.log('Usuario desconectado');
			});
		}

		return () => {
			socket.off('chat_message');
			socket.off('disconnect');
		};
	}, [messages, user]);
	// dependencia

	if (loading) return <h2>Loading...</h2>;

	const sendMessage = message => {
		// event.preventDefault();
		if (message) {
			//si hay mensaje
			socket.emit('chat_message', {
				message: message,
				user: user.email
			});
		}
	}; //trate de ponerlo abajo, pero no funcionaba

	return (
		<div>
			<div>
				<h1>{user ? 'ONLINE' : 'OFFLINE'} </h1>

				<ChatContainer sendMessage={sendMessage} messages={messages} />
			</div>
		</div>
	);
};
export default Chat;
