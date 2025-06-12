import { auth } from '../../lib/config/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = ({ setIsLogin }) => {
	return (
		<div>
			<h2>Sign Up</h2>
			<form onSubmit={event => handleSignUp(event)}>
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
			<p>
				Already have an account?
				<button onClick={() => setIsLogin(true)}>Log In</button>
			</p>
		</div>
	);
};

const handleSignUp = async event => {
	event.preventDefault();
	const formData = event.target;
	const email = formData.email.value;
	const password = formData.password.value;
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		console.log('usuario registrado correctamente');
	} catch (error) {
		console.log(error);
	}
};
export default SignUp;
