# Blog de Eze

Gracias por revisar mi proyecto! Por favor encontra un backup de las bases de datos en la carpeta ```db```. 
En los distintos archivos podes encontrar comentarios de que fue pasando. Tomar en cuenta que intente hacer un balance justo entre tiempo/funcionalidad. En total tarde 8hs en un dia + 6hs al siguiente, 14hs total.

*Abajo de todo voy a describir como lo plantee.*

Si por algun motivo queres reestablecer, reemplaza los archivos en ```blog_back/db```.


## Backend:

### Comandos de consola:

En el directorio del backend (```blog_back```):

#### `npm i`

Instala las dependencias del proyecto.

#### `node index.js`

Corre la API. Por defecto en el puerto ```5000```.

### Endpoints:

------------


#### Usuarios:

##### POST /login

Toma un objeto con ```usuario: nombre_de_usuario```, y si lo encuentra retorna un ```{id: id_de_usuario, auth: si_esta_autorizado, rol: rol_del_usuario}```.
Los roles pueden ser ```usuario``` o ```admin```. El ultimo le da privilegio de agregar/editar.

##### GET /logout

Simplemente resetea el usuario a valores nulos.

------------


#### Blog:

##### GET /posts

Devuelve un array de posts.

##### GET /post/:id

Devuelve un post unico, con ```id = id de parametros```.

##### POST /posts:

Agrega un nuevo post.

##### PUT /posts/:id

Edita un post con ```id = id de parametros```.

##### DELETE /posts/:id

Borra un post con ```id = id de parametros```.

## Frontend:
### Comandos de consola:

En el directorio del frontend (```blog_front```):

#### `npm i`

Instala las dependencias del proyecto.

#### `npm start`

Corre el front. Por defecto en el puerto ```3000```.

### Usabilidad:

------------
#### URL:
Entrar en [http://localhost:3000]().
#### Iniciar sesion:
Simplemente indica el usuario, sea ```admin``` o ```test```. El primero tiene potestad de agregar y editar posts.
*Tener en cuenta que utilice context para guardar el estado autenticado, por ende si refresheamos la pagina, nos "deslogueara".*

## Proceso:
### Stack:
- **Backend**: Node.js, Express, cors y librerias de los mismos como fs.
- **Frontend**: React, MaterialUI, nanoid.

### Proceso:
Dadas las consignas, fue obvio que necesitabamos una API, y Express siempre es lo mas comodo. Pense en agregar ```json-server```, pero dado que agregar los endpoints solo, senti que era medio tramposo. Se complico un poco con el manejo del json como db, pero despues de un poco de probar algunas funciones rapidas con Postman, lo pude resolver.

Entendi que lo mejor es haber hecho dos dbs, una para usuarios y otra para posts. Tome la decision de dar roles tambien. Comence a trabajar en la autenticacion, probe con ```jwt```, y despues con cookies, pero me encontre perdiendo mucho tiempo peleando contra la base en JSON y el token, asi que decidi hacer una autenticacion super simple como lo dice la consigna.

Una vez que termine con el back para autenticar, pase al front para hacer el login. Para evitar perder mas tiempo, use ```useContext``` para hacer llegar el usuario a toda la aplicacion. Dado que ese hook no lo tenia tan claro, no pense que el refresh de la pagina iba a resetear el estado. Si me daba cuenta antes, lo guardaba en una Cookie o LocalStorage. Asimimo, estoy seguro que es algo que idealmente manejar el backend con tokens.

Pase al back de nuevo para armar los endpoints de editar, agregar y borrar posts. No hubo mayores complicaciones aca. En relidad lo que costo un poco, fue el hecho de pasar requests a objectos y despues a JSON de nuevo para la db. Nada que un buen ```console.log()``` no nos ayude.

Finalizado eso, pasamos al front de nuevo. Aca tuve la segunda mayor perdida de tiempo, que por suerte solucione rapido: estaba teniendo problemas con un re-render, resulta que me faltaba agregar una condicion del tipo ```loading```para avisarle al padre que el hijo habia cambiado (```Blog.jsx -> Post.jsx```). Pero termine moviendo la logica al padre, lo cual era mas prolijo y tenia sentido.

### Bugs:
- Hay algunas cosas fuleras, sobre todo el tema del login/refresh que mencione. Se arregla con Cookie/Localstorage/etc.
- Material se queja de algunos campos por la cantidad de caracteres. Mas tiempo para arreglarlo y testearlo.
- Como escribir ```/login``` en la direccion cuenta como refrescar la pagina, perdemos el estado de ```auth``` y nos desloguea (aunque tengamos puesto el check). Se arregla con el auth en Cookie/Localstorage/etc.

### Pensamientos finales:
Muchas gracias por leer y chequear el codigo. Tuve un resultado del cual estoy orgulloso para 14hs. Podria haber hecho un mejor trabajo si yo hubiera definido todo antes de empezar a escribir el codigo.

Abrazo,
Eze Silveira
