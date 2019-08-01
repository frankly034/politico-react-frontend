import axios from 'axios';
import {
  GETTING_PARTIES,
  PARTIES_REQUEST,
  FETCH_PARTY_ERROR,
  CREATING_PARTY,
  CREATE_PARTY_REQUEST,
  CREATE_PARTY_ERROR,
  DELETING_PARTY,
  DELETE_PARTY_REQUEST,
  DELETE_PARTY_ERROR,
  EDITING_PARTY,
  EDIT_PARTY_REQUEST,
} from './types';

const instance = axios.create({
  baseURL: 'api/v1',
  headers: {
    'x-auth': localStorage.getItem('politicoToken'),
  },
});

export const fetchPartyError = err => ({
  type: FETCH_PARTY_ERROR,
  payload: err,
});

export const createPartyError = err => ({
  type: CREATE_PARTY_ERROR,
  payload: err,
});

export const deletePartyError = err => ({
  type: DELETE_PARTY_ERROR,
  payload: err,
});

export const fetchParties = () => (dispatch) => {
  dispatch({ type: GETTING_PARTIES });
  return instance.get('/parties')
    .then((res) => {
      dispatch({
        type: PARTIES_REQUEST,
        payload: res.data.data,
      });
      return res;
    })
    .catch((error) => {
      const err = error instanceof Error ? error.message : error.response.data.error;
      dispatch(fetchPartyError(err));
      console.log(Object.keys(err));
      throw new Error(err);
    });
};

export const createParty = partyData => (dispatch) => {
  dispatch({ type: CREATING_PARTY });
  return instance.post('/parties/upload', partyData)
    .then((res) => {
      dispatch({
        type: CREATE_PARTY_REQUEST,
        payload: res.data.data,
      });
      return res;
    })
    .catch((error) => {
      let err;
      if (error.response.data.error) {
        err = error.response.data.error;
      } else if (error instanceof Error) {
        err = error.message;
      }
      dispatch(createPartyError(err));
      throw new Error(err);
    });
};

export const deleteParty = id => (dispatch) => {
  dispatch({ type: DELETING_PARTY });
  return instance.delete(`/parties/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_PARTY_REQUEST,
        payload: id,
      });
      return res;
    })
    .catch((error) => {
      const err = error instanceof Error ? error.message : error.response.data.error;
      dispatch(deletePartyError(err));
      throw new Error(err);
    });
};

export const editParty = party => (dispatch) => {
  const { id } = party;
  dispatch({ type: EDITING_PARTY });
  return instance.patch(`/parties/${id}`, party)
    .then((res) => {
      dispatch({
        type: EDIT_PARTY_REQUEST,
        payload: res.data.data,
      });
      return res;
    })
    .catch((error) => {
      const err = error instanceof Error ? error.message : error.response.data.error;
      dispatch(deletePartyError(err));
      throw new Error(err);
    });
};
