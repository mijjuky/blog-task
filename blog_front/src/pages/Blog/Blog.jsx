import Post from '../../components/Post/Post';
import { useState, useEffect, useContext, useCallback } from 'react';
import { Typography } from '@mui/material';
import { LoginContext } from '../../context/loginContext';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { nanoid } from 'nanoid';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 900,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const Blog = () => {
	const [error, setError] = useState({ mensaje: '', status: false });
	const [posts, setPosts] = useState([]);
	const [usuario] = useContext(LoginContext);
	const [loading, setLoading] = useState(true);
	const [modalAbierto, setModalAbierto] = useState({
		abierto: false,
		tipo: null,
		post: null,
	});
	const [postEditado, setPostEditado] = useState({
		id: null,
		titulo: null,
		descripcion: null,
		imagen: null,
		cuerpo: null,
	});

	const handleClose = () => {
		setModalAbierto({ abierto: false, tipo: null });
		setPostEditado({
			id: null,
			titulo: null,
			descripcion: null,
			imagen: null,
			cuerpo: null,
		});
	};

	const agregarPost = async () => {
		await fetch('http://localhost:5000/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(postEditado),
		})
			.then(setModalAbierto({ abierto: false, tipo: null }))
			.finally(setLoading(true));
	};

	const editarPost = async (id) => {
		await fetch(`http://localhost:5000/posts/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(postEditado),
		})
			.then(setModalAbierto({ abierto: false, tipo: null }))
			.finally(setLoading(true));
	};

	const borrarPost = async (id) => {
		await fetch(`http://localhost:5000/posts/${id}`, {
			method: 'DELETE',
		})
			.then(setModalAbierto({ abierto: false, tipo: null }))
			.finally(setLoading(true));
	};

	// Esta funcion podria mejorar, usando el parametro para setear el e.target.value. Por un tema de tiempo, lo dejo asi.
	const handleEditarCampo = (field, e) => {
		switch (field) {
			case 'titulo':
				return setPostEditado({ ...postEditado, titulo: e.target.value });
			case 'descripcion':
				return setPostEditado({ ...postEditado, descripcion: e.target.value });
			case 'imagen':
				return setPostEditado({ ...postEditado, imagen: e.target.value });
			case 'cuerpo':
				return setPostEditado({ ...postEditado, cuerpo: e.target.value });
			default:
				break;
		}
	};

	const getPosts = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch('http://localhost:5000/posts');
			const data = await res.json();
			setError({ mensaje: '', status: false });
			setPosts(data);
			setLoading(false);
		} catch (error) {
			setError({ mensaje: 'Error al obtener los posts', status: true });
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (usuario.auth && loading) {
			getPosts();
			setError({ mensaje: '', status: false });
		} else {
			setLoading(false);
		}
	}, [getPosts, loading, usuario.auth]);

	const PromptBorrar = ({ id }) => (
		<Box>
			<Typography>Esta seguro que quiere borrar este post?</Typography>
			<Stack direction='row' spacing={1} mt={5}>
				<Button variant='outlined' color='error' onClick={() => borrarPost(id)}>
					Borrar
				</Button>
				<Button
					variant='contained'
					color='primary'
					onClick={() => handleClose()}>
					Cancelar
				</Button>
			</Stack>
		</Box>
	);

	const handleNewPost = () => {
		setModalAbierto({ abierto: true, tipo: 'agregar' });
		setPostEditado({
			id: nanoid(),
			titulo: undefined,
			descripcion: undefined,
			imagen: undefined,
			cuerpo: undefined,
		});
		PromptEditar();
	};

	// No estamos chequeando si el post cambio algo o no, por ende puede ser que se mande un POST sin sentido
	const PromptEditar = () => (
		<Box>
			<Typography>
				{`${modalAbierto.tipo === 'editar' ? 'Editar' : 'Agregar'}`} post
			</Typography>
			<Stack direction='column' spacing={3} mt={5}>
				<TextField
					label='Titulo'
					value={postEditado.titulo}
					onChange={(e) => handleEditarCampo('titulo', e)}
					multiline
				/>
				<TextField
					label='Descripcion'
					value={postEditado.descripcion}
					onChange={(e) => handleEditarCampo('descripcion', e)}
					multiline
				/>
				<TextField
					label='URL de imagen'
					value={postEditado.imagen}
					onChange={(e) => handleEditarCampo('imagen', e)}
					multiline
				/>
				<TextField
					label='Cuerpo'
					value={postEditado.cuerpo}
					onChange={(e) => handleEditarCampo('cuerpo', e)}
					multiline
				/>
			</Stack>
			<Stack direction='row' spacing={1} mt={3}>
				<Button
					variant='outlined'
					color='success'
					onClick={() => {modalAbierto.tipo === "editar" ? editarPost(postEditado.id) : agregarPost()}}>
					Guardar
				</Button>
				<Button
					variant='contained'
					color='primary'
					onClick={() => handleClose()}>
					Cancelar
				</Button>
			</Stack>
		</Box>
	);

	return (
		<>
			<Modal
				open={modalAbierto['abierto']}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					{modalAbierto.tipo === 'borrar' ? (
						<PromptBorrar id={postEditado.id} />
					) : (
						PromptEditar()
					)}
				</Box>
			</Modal>
			{error.mensaje ? <Typography>{error.mensaje}</Typography> : null}
			{loading ? (
				<Typography>Cargando...</Typography>
			) : posts.length > 0 ? (
				<>
					{usuario.rol === 'admin' ? (
						<IconButton
							aria-label='edit'
							onClick={() => handleNewPost()}
							sx={{ marginTop: '20px' }}>
							<AddIcon color='success' fontSize='large' />
						</IconButton>
					) : null}
					{posts.map((post) => (
						<Post
							key={post.id}
							post={post}
							setLoading={setLoading}
							setModalAbierto={setModalAbierto}
							setPostEditado={setPostEditado}
						/>
					))}
				</>
			) : (
				<Typography>No hay posts para mostrar</Typography>
			)}
		</>
	);
};

export default Blog;
