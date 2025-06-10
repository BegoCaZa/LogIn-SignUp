import { BrowserRouter } from 'react-router';
import { AuthProvider } from './lib/providers/AuthProvider';
import Router from './lib/router/Router';

import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<AuthProvider>
				<Router />
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
