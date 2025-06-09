import { useState } from 'react';
import { AuthContext } from '../contexts/authContext';

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	return (
		<AuthContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</AuthContext.Provider>
	);
};
