const { app } = require('express');
const db = require('../db/usuarios.json');

// No tiene mucho sentido esta autenticacion, pero es un ejemplo. Idealmete chequearimos un token.
// No me dio el tiempo (ya paso mucho) para hacerlo de una forma mas elegante.

// Hice un sistema muy basico de roles, para ver si el usuario puede editar o no.
const postLogin = (req, res) => {
	let reqUsuario = req.body.usuario;
	let usuarioExiste = db.find(
		(dbUsuario) => reqUsuario === dbUsuario.usuario
	);
	if (usuarioExiste) {
		let idUsuario = db.filter(
			(dbUsuario) => dbUsuario.usuario === reqUsuario
		)[0].id;
		switch (db.filter(dbUsuario => dbUsuario.id === idUsuario)[0].rol) {
			case 'admin':
				return res
					.send({ id: idUsuario, auth: true, rol: 'admin' })
					.status(200);
			case 'usuario':
				return res.send({ id: idUsuario, auth: true, rol: 'user' }).status(200);
			default:
				return res.status(403).end();
		}
	} else {
		res
			.send({
				message: 'Usuario no encontrado',
			})
			.status(404)
			.end();
	}
};

// No chequeo si el usuario esta loggueado.
const getLogout = (req, res) => {
	return res.send({ auth: false, rol: null }).status(200);
};

module.exports = {
	postLogin,
	getLogout,
};
