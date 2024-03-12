import { createContext, useReducer } from "react";
import axios from "axios";
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
  const loginUserAction = () => async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = axios.post(
        "http://localhost:9000/api/v1/user/login",
        formData,
        config
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <authContext.Provider value={{ loginUserAction }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
