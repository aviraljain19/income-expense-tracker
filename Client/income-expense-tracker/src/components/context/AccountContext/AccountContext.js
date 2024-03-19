import {
  ACCOUNT_DETAILS_FAIL,
  ACCOUNT_DETAILS_SUCCESS,
} from "./accountActionTypes";

const { createContext } = require("react");

export const accountContext = createContext();

const INITIAL_STATE = {
  account: null,
  accounts: [],
  loading: false,
  error: null,
};

const accountReaducer = (state, action) => {
  const { type, payload } = action;
};
