import { createContext, useReducer } from "react";
import axios from "axios";
import {
  ACCOUNT_DETAILS_FAIL,
  ACCOUNT_DETAILS_SUCCESS,
} from "./accountActionTypes";
import { API_URL_ACCOUNT } from "../../../utils/apiUrl";

export const accountContext = createContext();

const INITIAL_STATE = {
  account: null,
  accounts: [],
  loading: false,
  error: null,
};

const accountReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        account: payload,
        loading: false,
        error: null,
      };
    case ACCOUNT_DETAILS_FAIL:
      return {
        ...state,
        account: null,
        loading: false,
        error: payload,
      };
  }
};

export const AccountContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, INITIAL_STATE);
  console.log(state);
  const config = {
    headers: {
      Authorization: `Bearer ${state?.userauth?.token}`,
      "Content-Type": "application/json",
    },
  };
  const getAccountDetailsAction = async (id) => {
    try {
      const res = await axios.get(`${API_URL_ACCOUNT}/${id}`, config);
      console.log(res);
      if (res?.data?.status === "success") {
        dispatch({
          type: ACCOUNT_DETAILS_SUCCESS,
          payload: res?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ACCOUNT_DETAILS_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  };
  return (
    <accountContext.Provider
      value={{ getAccountDetailsAction, account: state?.account }}
    >
      {children}
    </accountContext.Provider>
  );
};
