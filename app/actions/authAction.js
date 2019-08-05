import instance from '../helpers/axios';

import {
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGNUP_ERROR,
  LOGIN_ERROR,
  LOGIN_IN,
  SIGNIN_UP,
} from './types';

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
  return instance.post('/auth/signup', userData)
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
  return instance.post('/auth/login', data)
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
      const err = error instanceof Error ? error.message : error.response.data.error;
      dispatch(loginError(err));
      throw new Error(err);
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('politicoToken');
  localStorage.removeItem('politicoUser');
  dispatch({
    type: LOGOUT_REQUEST,
  });
};
