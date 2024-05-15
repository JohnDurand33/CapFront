import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
    const [loggedIn, setIsLoggedIn] = useState(false);

    const toggleIsLoggedIn = () => {
        setIsLoggedIn(!loggedIn);
    };

    return (
        <LoginContext.Provider value={{loggedIn,setIsLoggedIn}}>
            {children}
        </LoginContext.Provider>
    );
};
export default LoginContext;

