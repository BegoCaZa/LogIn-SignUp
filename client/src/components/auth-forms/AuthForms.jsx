import { useContext } from 'react';
import SignUp from '../signUp/SignUp';
import { AuthContext } from '../../lib/contexts/authContext';
import { signOut } from 'firebase/auth';
import LogIn from '../logIn/LogIn';
import { auth } from '../../lib/config/firebase.config';
import { StyledGeneralContainer } from './authForm.styles';

const AuthForms = () => {
	const { user } = useContext(AuthContext);
	console.log(user);

	return (
		<>
			{!user && (
				<StyledGeneralContainer>
					<SignUp />
					<LogIn />
				</StyledGeneralContainer>
			)}
			{user && <button onClick={logOut}>Sign Out</button>}
		</>
	);
};

const logOut = async () => {
	await signOut(auth);
};

export default AuthForms;
