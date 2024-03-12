import { createContext, useReducer } from "react";

export const authContext = createContext();

const INITIAL_STATE = {
  userAuth: null,
  error: null,
  loading: false,
  profile: null,
};

const reducer = (state, action) => {
  return {};
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <authContext.Provider value={{ isLogin: false }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
