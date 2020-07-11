import { types } from '../actions/types';
const initialState = [];

export default function query(state = initialState, { type, payload }) {
  switch (type) {
    case types.QUERY:
      return {
        ...state,
        query: payload.query
      };
    default:
      return state;
  }
}
