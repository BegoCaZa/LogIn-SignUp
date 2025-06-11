import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './lib/providers/AuthProvider';
import Router from './lib/router/Router';

import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<GlobalStyles />
				<Router />
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;
