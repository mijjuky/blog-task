import React, { useState, createContext } from 'react';

// use esta guia: https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react
// para armarlo de esta forma.
const LoginContext = createContext([{}, () => {}]);

const LoginContextProvider = (props) => {
	const [usuario, setUsuario] = useState({ auth: false, rol: null});
	return (
		<LoginContext.Provider value={[usuario, setUsuario]}>
			{props.children}
		</LoginContext.Provider>
	);
};

export { LoginContext, LoginContextProvider };
