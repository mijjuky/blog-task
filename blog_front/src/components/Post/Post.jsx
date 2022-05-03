import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { LoginContext } from '../../context/loginContext';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const Post = ({ post, setModalAbierto, setPostEditado }) => {
	// Aca muestro cada post con sus propiedades. Por mejorar seria chequear que la data realmente exista, por ejemplo la imagen no sea nula.
	// No esta bueno que los valores esten en px, pero por una cuestion de tiempo me ahorro el detalle.
	const [usuario] = useContext(LoginContext);

	const handleOpen = (type) => {
		setModalAbierto({ abierto: true, tipo: type });
		setPostEditado(post);
	};

	return (
		<>
			<Card sx={{ marginTop: '30px' }}>
				<CardHeader
					title={post.titulo}
					subheader={post.descripcion}
					action={
						usuario.rol === 'admin' ? (
							<Stack direction='row' spacing={1}>
								<IconButton
									aria-label='delete'
									onClick={() => handleOpen('borrar')}>
									<DeleteIcon />
								</IconButton>
								<IconButton
									aria-label='edit'
									onClick={() => handleOpen('editar')}>
									<EditIcon />
								</IconButton>
							</Stack>
						) : null
					}
				/>
				<CardMedia
					component='img'
					height='700'
					image={post.imagen}
					alt='Imagen'
				/>
				<CardContent>
					<Typography paragraph>{post.cuerpo}</Typography>
				</CardContent>
			</Card>
		</>
	);
};

export default Post;
