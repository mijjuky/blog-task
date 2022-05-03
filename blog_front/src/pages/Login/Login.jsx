import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useContext, useEffect } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/loginContext';

const Login = () => {
	const [error, setError] = useState(false);
	const [tryUsuario, setTryUsuario] = useState('');
	const [usuario, setUsuario] = useContext(LoginContext);
	const navigate = useNavigate();

	const loginRequest = async (tryUsuario) => {
		const response = await fetch('http://localhost:5000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: `{"usuario": "${tryUsuario}"}`,
		});
		const data = await response;
		const jsonRes = await data.json();

		if (jsonRes.auth !== true) {
			setError(true);
		} else {
			setError(false);
			setUsuario(jsonRes);
			navigate('/blog');
		}
	};

	const handleCambioUsuario = (e) => {
		setTryUsuario(e.target.value);
	};

	useEffect(() => {
		if (usuario.auth === true) {
			navigate('/blog');
		}
	}, [navigate, usuario]);

	return (
		<Box
			component='form'
			noValidate
			autoComplete='off'
			sx={{
				marginTop: '30px',
				textAlign: 'center',
				height: '55px',
			}}>
			<TextField
				error={error}
				sx={{ width: '60%', height: '100%' }}
				label='Ingresa tu usuario'
				variant='outlined'
				helperText={error ? 'Error, intenta de nuevo.' : null}
				onChange={handleCambioUsuario}
				value={tryUsuario}
			/>
			<Button
				type='button'
				variant='contained'
				color={error ? 'error' : 'primary'}
				endIcon={<LoginIcon />}
				sx={{ height: '100%', marginLeft: '10px' }}
				onClick={() => loginRequest(tryUsuario)}>
				Login
			</Button>
		</Box>
	);
};

export default Login;
