import AuthForms from './components/auth-forms/AuthForms';
import { AuthProvider } from './lib/providers/AuthProvider';
import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
	return (
		<>
			<GlobalStyles />
			<AuthProvider>
				<AuthForms />
			</AuthProvider>
		</>
	);
};

export default App;
