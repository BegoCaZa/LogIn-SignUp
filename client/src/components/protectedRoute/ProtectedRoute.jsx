import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../../lib/contexts/authContext';

const ProtectedRoute = ({ children }) => {
	const { user } = useContext(AuthContext);

	return user ? children : <Navigate to='/' replace />;
};

export default ProtectedRoute;
