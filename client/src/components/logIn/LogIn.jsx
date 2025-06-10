import { signInWithEmailAndPassword } from 'firebase/auth';

const LogIn = () => {
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
		</>
	);
};

const loginUser = async event => {
	event.preventDefault();
	const formData = event.target;
	const email = formData.email.value;
	const password = formData.password.value;

	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.log(error);
	}
};

export default LogIn;
