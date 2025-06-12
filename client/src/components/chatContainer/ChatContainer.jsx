import {
	StyledChatContainer,
	StyledGeneralContainer,
	StyledMessage
} from './chatContainer.styles';
import { v4 } from 'uuid';

const ChatContainer = ({ sendMessage, messages }) => {
	return (
		<StyledGeneralContainer>
			<StyledChatContainer>
				{messages.map(message => (
					<StyledMessage key={v4()}>
						<span>{message.user}:</span> {message.message}
					</StyledMessage>
				))}
			</StyledChatContainer>
			<input type='text' placeholder='Escribe un mensaje...' />
			<button onClick={event => sendMessage(event, user)}>Enviar</button>
		</StyledGeneralContainer>
	);

	const sendMessage = (event, user) => {
		const newMessage = event.target.value; //obtengo el valor del input
		socket.emit('chat_message', {
			message: newMessage,
			user: user.email //mando el email del usuario
		});
		//si hay un mensaje nuevo, lo mando
	};
};

export default ChatContainer;
