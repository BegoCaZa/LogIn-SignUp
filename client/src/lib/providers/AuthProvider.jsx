import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import { auth } from '../config/firebase.config';

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				console.log('usuario autenticado', user);
				setUser(user);
			} else {
				console.log('usuario no autenticado');
				setUser(null);
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
