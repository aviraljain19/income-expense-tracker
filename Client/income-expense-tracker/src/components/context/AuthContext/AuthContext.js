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
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, error: null, userAuth: payload };
    case "LOGIN_FAILED":
      return { ...state, loading: false, error: payload, userAuth: null };
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const loginUserAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:9000/api/v1/user/login",
        formData,
        config
      );
      if (res?.data?.status === "Success") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data,
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      dispatch({
        type: "LOGIN_FAILED",
        payload: error?.response?.data?.message,
      });
    }
  };
  return (
    <authContext.Provider value={{ loginUserAction, userAuth: state }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
