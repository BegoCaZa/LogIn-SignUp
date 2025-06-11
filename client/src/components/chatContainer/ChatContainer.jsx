import {
	StyledChatContainer,
	StyledGeneralContainer,
	StyledMessage
} from './chatContainer.styles';
import { v4 } from 'uuid';

const ChatContainer = ({
	newMessage,
	setNewMessage,
	sendMessage,
	messages
}) => {
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
				onChange={e => setNewMessage(e.target.value)}
			/>
			<button onClick={sendMessage}>Enviar</button>
		</StyledGeneralContainer>
	);
};

export default ChatContainer;
