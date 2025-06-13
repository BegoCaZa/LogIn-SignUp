import {
	StyledChatContainer,
	StyledGeneralContainer,
	StyledMessage
} from './chatContainer.styles';
import { v4 } from 'uuid';
import { useState, useContext } from 'react';
import { saveMessage } from '../../lib/utils/api';

import { AuthContext } from '../../lib/contexts/authContext';

const ChatContainer = ({ sendMessage, messages }) => {
	const [newMessage, setNewMessage] = useState('');
	const { user } = useContext(AuthContext);

	const handleSend = event => {
		event.preventDefault();
		sendMessage(newMessage); //mando el mensaje al padre
		setNewMessage(''); //limpio el input
		saveMessage({
			user: user.email,
			message: newMessage,
			date: new Date().toDateString()
		});
	};

	return (
		<StyledGeneralContainer>
			<StyledChatContainer>
				{messages.map(message => (
					<StyledMessage key={v4()}>
						<span>{message.user}:</span> {message.message}
					</StyledMessage>
				))}
			</StyledChatContainer>
			<input
				type='text'
				placeholder='Escribe un mensaje...'
				value={newMessage}
				onChange={event => setNewMessage(event.target.value)}
			/>
			<button onClick={handleSend}>Enviar</button>
		</StyledGeneralContainer>
	);
};

export default ChatContainer;
