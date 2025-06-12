import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import { auth } from '../config/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
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
