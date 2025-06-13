import {
	StyledChatContainer,
	StyledGeneralContainer,
	StyledMessage
} from './chatContainer.styles';
import { v4 } from 'uuid';
import { useState } from 'react';
import { saveMessage } from '../../lib/utils/api';

const ChatContainer = ({ sendMessage, messages }) => {
	const [newMessage, setNewMessage] = useState('');

	const handleSend = event => {
		event.preventDefault();
		sendMessage(newMessage); //mando el mensaje al padre
		setNewMessage(''); //limpio el input
		saveMessage(newMessage);
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
