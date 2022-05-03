const app = require('express');
const router = app.Router();
const {
	getPosts,
    getUnicoPost,
    postNuevoPost,
    putEditarPost,
    deleteBorrarPost
} = require('../controller/blog.js');
const { postLogin, getLogout } = require('../controller/usuarios.js');

// Rutas de API de cuenta
router.post('/login', postLogin);
router.get('/logout', getLogout);

// Rutas de API de blog
router.get('/posts', getPosts);
router.get('/posts/:id', getUnicoPost);
router.post('/posts', postNuevoPost);
router.put('/posts/:id', putEditarPost);
router.delete('/posts/:id', deleteBorrarPost);

module.exports = router;
