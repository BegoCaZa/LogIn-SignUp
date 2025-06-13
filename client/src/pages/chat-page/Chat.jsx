import ChatContainer from '../../components/chatContainer/ChatContainer';
import { useEffect, useState, useContext } from 'react';
import socket from '../../lib/config/socket.config';
import { AuthContext } from '../../lib/contexts/authContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/config/firebase.config';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
	const [messages, setMessages] = useState([]); //aqui se guardan los mensajes
	const { user, loading } = useContext(AuthContext);
	const navigate = useNavigate();
	const [allMessages, setAllMessages] = useState([]); //para guardar todos los mensajes

	useEffect(() => {
		if (user) {
			socket.on('connect', () => {
				socket.emit('user_connected', { email: user.email }); //mando esto
				console.log('Usuario conectado:', user.email);
			});

			socket.on('chat_message', data => {
				const updatedMessages = [...messages, data];
				setMessages(updatedMessages); //actualizo los mensajes con el nuevo mensaje
				setAllMessages(updatedMessages); //actualizo todos los mensajes
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
	};

	const handleGetChatHistory = () => {
		navigate('/chat-history');
	};

	return (
		<div>
			<div>
				<h1>{user ? 'ONLINE' : 'OFFLINE'} </h1>
				<button onClick={() => logout(navigate)}>Sign Out</button>

				<ChatContainer sendMessage={sendMessage} messages={messages} />
				<button onClick={handleGetChatHistory}>Chat History</button>
			</div>
		</div>
	);
};

const logout = async navigate => {
	await signOut(auth);
	navigate('/'); //navego a la pagina de inicio
};

export default Chat;
