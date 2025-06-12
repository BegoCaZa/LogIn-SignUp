import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Chat from '../../pages/chat-page/Chat';
import ChatHistory from '../../pages/chatHistory/chatHistory';

const Router = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/chat' element={<Chat />} />
				<Route path='/chat-history' element={<ChatHistory />} />
			</Routes>
		</>
	);
};

export default Router;
