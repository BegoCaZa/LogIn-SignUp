import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import { auth } from '../config/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
