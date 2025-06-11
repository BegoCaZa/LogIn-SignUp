import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../lib/contexts/authContext';

const ProtectedRoute = ({ children }) => {
	const context = useContext(AuthContext);

	console.log('ProtectedRoute context:', context);
	const { user } = useContext(AuthContext);

	if (!user) {
		return <Navigate to='/' replace />;
	}

	return children;
};

export default ProtectedRoute;
