import LogIn from '../../components/login/LogIn';
import SignUp from '../../components/signUp/SignUp';
import { useContext, useState } from 'react';
import { AuthContext } from '../../lib/contexts/authContext';
import { auth } from '../../lib/config/firebase.config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const { user, loading } = useContext(AuthContext);
	const [isLogin, setIsLogin] = useState(false);
	const navigate = useNavigate();
	console.log(user);

	useEffect(() => {
		if (user) navigate('/chat');
	}, [navigate, user]);

	if (loading) return <h2>Loading...</h2>;

	return (
		<>
			<h2>Welcome to the Chat App</h2>
			{isLogin ? (
				<LogIn setIsLogin={setIsLogin} />
			) : (
				<SignUp setIsLogin={setIsLogin} />
			)}
		</>
	);
};

export default Home;
