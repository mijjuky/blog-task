const cors = require('cors');
const express = require('express');
const app = express();
const routes = require('./routes');

// Sobre el back, hay muchas cosas por mejorar, sobre todo lo que menciono en el README. No hay una
// autenticacion real mas que cheuquear por el usuario, sin token es lo mismo que nada, pero claramente
// es un ejercicio. 
// Lo mismo pasa en el Blog, estaria buenisimo poder chequear aca si el usuario esta con un login valido,
// y si tiene la potestad de editar o no.

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(routes)

const iniciarApi = (puerto) => {
	try {
		app.listen(puerto, () => {
			console.log(`Api escuchando en: http://localhost:${puerto}`);
		});
	} catch (error) {
		console.error(error);
		process.exit();
	}
};
iniciarApi(5000);
