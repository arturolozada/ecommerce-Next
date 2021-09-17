const { createContext } = require("react");


const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null,
    setReloadUser: () => null
});

export default AuthContext;