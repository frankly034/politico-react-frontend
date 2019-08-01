import { combineReducers } from 'redux';

import authReducer from './authReducer';
import partyReducer from './partyReducer';

export default combineReducers({
  auth: authReducer,
  party: partyReducer,
});
