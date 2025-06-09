import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/config/firebase.config';
import { useState } from 'react';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSignUp = async (e, registerData) => {
		e.preventDefault();
		const { email, password } = registerData;
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (err) {
			setError(err.message);
		}
	};
	return (
		<div>
			<h2>Sign Up</h2>
			<form onSubmit={() => handleSignUp(email, password)}>
				<div>
					<label>Email:</label>
					<input
						type='text'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>
				{error}
				<p>{error}</p>
				<button type='submit'>Sign Up</button>
			</form>
		</div>
	);
};
export default SignUp;
