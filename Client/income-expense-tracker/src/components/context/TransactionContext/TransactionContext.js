import axios from "axios";
import { React, createContext, useReducer } from "react";
import {
  TRANSACTION_CREATION_FAIL,
  TRANSACTION_CREATION_STARTED,
  TRANSACTION_CREATION_SUCCESS,
} from "./TransactionActionTypes";
import { API_URL_TRANSACTION } from "../../../utils/apiUrl";

export const transactionContext = createContext();

const INITIAL_STATE = {
  transaction: null,
  transactions: [],
  loading: false,
  error: null,
  token: JSON.parse(localStorage.getItem("userAuth")),
};

const transactionReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TRANSACTION_CREATION_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case TRANSACTION_CREATION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, INITIAL_STATE);
  const createTransactionAction = async (accountData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      const res = await axios.post(
        `${API_URL_TRANSACTION}`,
        accountData,
        config
      );
      if (res?.status === "success") {
        dispatch({
          type: TRANSACTION_CREATION_SUCCESS,
          payload: res,
        });
      }
      window.location.href = `/dashboard`;
    } catch (error) {
      dispatch({
        type: TRANSACTION_CREATION_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
  return (
    <transactionContext.Provider
      value={{
        transaction: state.transaction,
        transactions: state.transactions,
        error: state.error,
        createTransactionAction,
      }}
    >
      {children}
    </transactionContext.Provider>
  );
};
