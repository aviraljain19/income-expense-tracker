import { createContext, useReducer } from "react";
import axios from "axios";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  LOGOUT,
} from "./authActionTypes";
import { API_URL_USER } from "../../../utils/apiUrl";

export const authContext = createContext();

const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  error: null,
  loading: false,
  profile: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("userAuth", JSON.stringify(payload));
      return { ...state, loading: false, error: null, userAuth: payload };
    case LOGIN_FAILED:
      return { ...state, loading: false, error: payload, userAuth: null };
    case FETCH_PROFILE_SUCCESS:
      return { ...state, loading: false, error: null, profile: payload };
    case FETCH_PROFILE_FAIL:
      return { ...state, loading: false, error: payload, profile: null };
    case LOGOUT:
      localStorage.removeItem("userAuth");
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: null,
      };
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
      const res = await axios.post(`${API_URL_USER}/login`, formData, config);
      if (res?.data?.status === "Success") {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      }

      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
  const fetchProfileAction = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.get(`${API_URL_USER}/profile`, config);
      if (res?.data) {
        dispatch({
          type: FETCH_PROFILE_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_PROFILE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
  const logoutUserAction = () => {
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    window.location.href = "/login";
  };

  return (
    <authContext.Provider
      value={{
        loginUserAction,
        userAuth: state,
        token: state?.userAuth?.token,
        fetchProfileAction,
        profile: state?.profile,
        error: state?.error,
        logoutUserAction,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
