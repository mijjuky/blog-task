const db = require('../db/posts.json');
const { writeFileSync, readFileSync, fstat } = require('fs');

// Hay varias cosas para mejorar, por ejemplo se repite el path a la db, ya que fs no se portaba bien.
// Asimismo estaria bueno chequear con autorizaqcion() que el user tenga privilegios.

const getPosts = (req, res) => {
	const posts = readFileSync('db/posts.json');
	if (!posts) {
		return res.send('No se encontraron posts').status(404).end();
	}
	return res.send(posts).status(200);
};

const getUnicoPost = async (req, res) => {
	const posts = readFileSync('db/posts.json');
	const postFiltrado = JSON.parse(posts).find(
		(dbPost) => dbPost.id === req.params.id
	);
	if (!postFiltrado) {
		return res.send('No se encontro el post').status(404).end();
	}
	return res.send(postFiltrado).status(200);
};

// Este POST no chequea los campos.
const postNuevoPost = (req, res) => {
	const posts = JSON.parse(readFileSync('db/posts.json'));
	const post = req.body;
	posts.push(post);
	writeFileSync('db/posts.json', JSON.stringify(posts));
	return res.send({ message: 'Post agregado!', post: post }).status(200);
};

// Este PUT no chequea los campos, sobreesribe todo el post existente. Puede que esto incluso sea mejor, no estoy seguro.
const putEditarPost = (req, res) => {
	const posts = JSON.parse(readFileSync('db/posts.json'));
	const nuevoPost = req.body;
	const indiceEnDb = posts.findIndex((dbPost) => dbPost.id === req.params.id);
	if (indiceEnDb !== -1) {
		posts[indiceEnDb] = nuevoPost;
		writeFileSync('db/posts.json', JSON.stringify(posts));
		return res
			.send({ message: 'Post editado!', post: posts[indiceEnDb] })
			.status(200);
	}
	return res.send({ message: 'Error al editar el post' }).status(404).end();
};

// No esta bueno tirar DELETE en una db. Es mejor hacer un PUT y vaciar los campos segun tengo entendido.
const deleteBorrarPost = (req, res) => {
	const posts = JSON.parse(readFileSync('db/posts.json'));
	const index = posts.findIndex((post) => post.id === req.params.id);
	posts.splice(index, 1);
	writeFileSync('db/posts.json', JSON.stringify(posts));
	return res.send({ message: 'Post borrado!' }).status(200);
};

module.exports = {
	getPosts,
	getUnicoPost,
	postNuevoPost,
	putEditarPost,
	deleteBorrarPost,
};
