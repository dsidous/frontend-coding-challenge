import { types } from '../actions/types';
const initialState = [];

export default function tournaments(state = initialState, { type, payload }) {
  switch (type) {
    case types.FETCH_TOURNAMENTS:
      return {
        ...state,
        loading: true,
        error: false
      };
    case types.FETCH_TOURNAMENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case types.FETCH_TOURNAMENTS_SUCCESS:
      return {
        ...state,
        tournaments: payload,
        loading: false,
        error: false
      };
    case types.CREATE_TOURNAMENT:
      return {
        ...state,
        tournaments: [...state.tournaments, payload]
      };
    case types.EDIT_TOURNAMENT:
      return {
        ...state,
        tournaments: state.tournaments.map(t =>
          t.id === payload.id ? payload : t
        )
      };
    case types.DELETE_TOURNAMENT:
      return {
        ...state,
        tournaments: state.tournaments.filter(t => t.id !== payload)
      };
    default:
      return state;
  }
}
