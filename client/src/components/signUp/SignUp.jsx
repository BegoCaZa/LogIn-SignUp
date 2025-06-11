import { auth } from '../../lib/config/firebase.config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
	const navigate = useNavigate();

	const handleSignUp = async event => {
		event.preventDefault();
		const formData = event.target;
		const email = formData.email.value;
		const password = formData.password.value;
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			console.log('usuario registrado correctamente');
			navigate('/chat');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h2>Sign Up</h2>
			<form onSubmit={handleSignUp}>
				<div>
					<label htmlFor='email'>Email:</label>
					<input type='email' name='email' />
				</div>
				<div>
					<label htmlFor='password'>Password:</label>
					<input type='password' name='password' />
				</div>

				<button type='submit'>Sign Up</button>
			</form>
		</div>
	);
};
export default SignUp;
