import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/config/firebase.config';

const LogIn = ({ setIsLogin }) => {
	const loginUser = async event => {
		event.preventDefault();
		const formData = event.target;
		const email = formData.email.value;
		const password = formData.password.value;

		if (!email || !password) return;

		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<h2>LogIn</h2>
			<form onSubmit={loginUser}>
				<div>
					<label htmlFor='email'>Email</label>
					<input type='text' name='email' />
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input type='text' name='password' />
				</div>
				<input type='submit' value='LOGIN' />
			</form>
			<p>
				Don't have an account?
				<button onClick={() => setIsLogin(false)}>Sign Up</button>
			</p>
		</>
	);
};

export default LogIn;
