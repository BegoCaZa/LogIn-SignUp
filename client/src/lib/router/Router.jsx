import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Chat from '../../pages/chat-page/Chat';
import ProtectedRoute from '../../components/protectedRoute/ProtectedRoute';

const Router = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='/chat'
					element={
						<ProtectedRoute>
							<Chat />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</>
	);
};

export default Router;
