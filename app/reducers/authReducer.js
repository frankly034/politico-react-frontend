import {
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGNUP_ERROR,
  LOGIN_ERROR,
  LOGIN_IN,
  SIGNIN_UP,
} from '../actions/types';

const user = JSON.parse(localStorage.getItem('politicoUser'));

const initialState = {
  user: user || {},
  isAuthenticated: !!localStorage.getItem('politicoToken'),
  errors: [],
  loginIn: false,
  signinUp: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_UP:
      return {
        ...state,
        errors: [],
        signinUp: true,
      };

    case SIGNUP_REQUEST:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        errors: [],
        signinUp: false,
      };

    case LOGIN_IN:
      return {
        ...state,
        errors: [],
        loginIn: true,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        errors: [],
        loginIn: false,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
      };

    case SIGNUP_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        errors: action.payload,
        loginIn: false,
        signinUp: false,
      };

    default: return state;
  }
};
