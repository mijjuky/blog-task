import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Blog from './pages/Blog/Blog';
import { Route, Routes } from 'react-router-dom';
import { LoginContextProvider } from './context/loginContext';

// Agrego el contexto de login para pasarle el estado de login.
// Reseteo los estilos y armo el router.

function App() {
	return (
		<div>
			<LoginContextProvider>
				<CssBaseline />
				<Container maxWidth='xl'>
					<Header />
					<Routes>
						<Route index element={<Blog />} />
						<Route path='login' element={<Login />} />
						<Route path='blog' element={<Blog />} />
					</Routes>
				</Container>
			</LoginContextProvider>
		</div>
	);
}

export default App;
