import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/config/firebase.config';
import { useState } from 'react';
import { StyledGeneralContainer } from './signUp.styles';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSignUp = async event => {
		event.preventDefault();
		const formData = event.target;
		const email = formData.email.value;
		const password = formData.password.value;
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			console.log('usuario registrado correctamente');
		} catch (error) {
			setError(error);
			console.log(error);
		}
	};

	return (
		<div>
			<h2>Sign Up</h2>
			<form onSubmit={event => handleSignUp(event)}>
				<div>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						name='email'
						onChange={event => setEmail(event.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						name='password'
						onChange={event => setPassword(event.target.value)}
						required
					/>
				</div>

				<button type='submit'>Sign Up</button>
			</form>
		</div>
	);
};
export default SignUp;
