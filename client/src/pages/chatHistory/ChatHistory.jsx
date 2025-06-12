import HistoryContainer from '../../components/historyContainer/HistoryContainer';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../lib/contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../lib/config/firebase.config';
import socket from '../../lib/config/socket.config';
const ChatHistory = () => {
	const [messages, setMessages] = useState([]);
	const { user, loading } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			socket.emit('get_chat_history'); // Solicita el historial de chat al servidor
			socket.on('chat_history', data => {
				setMessages(data); // traigo los mensajes del historial
			});
		}

		return () => {
			socket.off('chat_history');
		};
	}, [user]);

	if (loading) return <h2>Loading...</h2>;

	if (!user) {
		navigate('/'); //asegurarse de que el usuario esté autenticado
		return null;
	}

	return (
		<div>
			<h1>Chat History</h1>
			<HistoryContainer messages={messages} />
		</div>
	);
};

export default ChatHistory;
