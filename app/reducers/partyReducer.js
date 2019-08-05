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
  EDIT_PARTY_ERROR,
} from '../actions/types';

const initialState = {
  parties: [],
  party: {},
  errors: [],
  fetchingParties: false,
  creatingParty: false,
  deletingParty: false,
  editingParty: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETTING_PARTIES:
      return {
        ...state,
        errors: [],
        fetchingParties: true,
      };

    case DELETING_PARTY:
      return {
        ...state,
        errors: [],
        deletingParty: true,
      };

    case EDITING_PARTY:
      return {
        ...state,
        errors: [],
        editingParty: true,
      };

    case EDIT_PARTY_REQUEST:
      return {
        ...state,
        errors: [],
        parties: state.parties
          .filter(party => party.id !== action.payload.id)
          .concat(action.payload),
        editingParty: false,
      };

    case PARTIES_REQUEST:
      return {
        ...state,
        parties: action.payload,
        errors: [],
        fetchingParties: false,
      };

    case CREATING_PARTY:
      return {
        ...state,
        errors: [],
        creatingParty: true,
      };

    case CREATE_PARTY_REQUEST:
      return {
        ...state,
        party: action.payload,
        errors: [],
        creatingParty: false,
      };

    case DELETE_PARTY_REQUEST:
      return {
        ...state,
        party: action.payload,
        errors: [],
        deletingParty: false,
        parties: state.parties.filter(party => party.id !== action.payload),
      };

    case FETCH_PARTY_ERROR:
    case CREATE_PARTY_ERROR:
    case DELETE_PARTY_ERROR:
    case EDIT_PARTY_ERROR:
      return {
        ...state,
        errors: action.payload,
        fetchingParties: false,
        creatingParty: false,
        deletingParty: false,
        editingParty: false,
      };

    default: return state;
  }
};
