import axios from 'axios';
import {
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGNUP_ERROR,
  LOGIN_ERROR,
  LOGIN_IN,
  SIGNIN_UP,
} from './types';

const instance = axios.create({
  baseURL: 'https://politico034.herokuapp.com/api/v1/auth',
});

export const signupError = error => ({
  type: SIGNUP_ERROR,
  payload: error,
});

export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: error,
});

export const signup = userData => (dispatch) => {
  dispatch({ type: SIGNIN_UP });
  return instance.post('/signup', userData)
    .then((res) => {
      localStorage.setItem('politicoToken', res.data.data.token);
      localStorage.setItem('politicoUser', JSON.stringify(res.data.data.user));
      dispatch({
        type: SIGNUP_REQUEST,
        payload: res.data.data.user,
      });
      return res;
    })
    .catch((error) => {
      dispatch(signupError(error.response.data.error));
      return error.response.data;
    });
};

export const login = data => (dispatch) => {
  dispatch({ type: LOGIN_IN });
  return instance.post('/login', data)
    .then((res) => {
      localStorage.setItem('politicoToken', res.data.data.token);
      localStorage.setItem('politicoUser', JSON.stringify(res.data.data.user));
      dispatch({
        type: LOGIN_REQUEST,
        payload: res.data.data.user,
      });
      return res;
    })
    .catch((error) => {
      dispatch(loginError(error.response.data.error));
      return error.response.data;
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('politicoToken');
  localStorage.removeItem('politicoUser');
  dispatch({
    type: LOGOUT_REQUEST,
  });
};
