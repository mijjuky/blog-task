import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {LoginContext} from '../../context/loginContext';
import {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
export default function Header() {
    const [user, setUser] = useContext(LoginContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await fetch('http://localhost:5000/logout', {
            method: 'GET',
        });
        const jsonRes = await response.json();
        setUser(jsonRes);
        navigate('/login');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Blog de Eze
            </Typography>
            <Button color="inherit" onClick={user.auth ? () => {handleLogout()} : () => navigate("/login")}>{user.auth ? "Logout" : "Login"}</Button>
            </Toolbar>
        </AppBar>
        </Box>
    );
}