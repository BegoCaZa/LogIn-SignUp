import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import { auth } from '../config/firebase.config';

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				setUser(user);
				console.log('User is signed in:', user.email);
			} else {
				setUser(null);
				console.log('No user');
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
