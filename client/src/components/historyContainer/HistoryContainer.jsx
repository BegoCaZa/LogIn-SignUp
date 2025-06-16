import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { deleteHistory, getAllMessages } from '../../lib/utils/api';
import { useNavigate } from 'react-router';

const HistoryContainer = () => {
	const [messages, setMessages] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchMessages(setMessages);
	}, []);
	return (
		<div>
			<h2>History</h2>
			<ul>
				{messages.map(msg => (
					<li key={v4()}>
						<span>
							({msg.date}){msg.user}:
						</span>{' '}
						{msg.message}
					</li>
				))}
			</ul>
			<button onClick={() => navigate('/chat')}>Back to chat</button>
			<button onClick={() => clearHistory(setMessages)}>Clear History</button>
		</div>
	);
};

const fetchMessages = async setMessages => {
	try {
		const data = await getAllMessages();
		setMessages(data);
	} catch (error) {
		console.error('Error al obtener el historial:', error);
	}
};

const clearHistory = setMessages => {
	deleteHistory();
	setMessages([]);
};

export default HistoryContainer;
