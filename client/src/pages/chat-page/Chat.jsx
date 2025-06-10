import {
	StyledChatContainer,
	StyledGeneralContainer,
	StyledMessage
} from './chat.styles';

const Chat = ({ setNewMessage, sendMessage, messages }) => {
	return (
		<StyledGeneralContainer>
			<StyledChatContainer>
				{messages.map(message => (
					<StyledMessage>
						{message.user}: {message.message}
					</StyledMessage>
				))}
			</StyledChatContainer>
			<input
				type='text'
				placeholder='Escribe un mensaje...'
				onChange={e => setNewMessage(e.target.value)}
			/>
			{/* //cuando cambia el texto, guarda ese valor en el estado de nuevo mensaje */}
			<button onClick={sendMessage}>Enviar</button>
		</StyledGeneralContainer>
	);
};
export default Chat;
