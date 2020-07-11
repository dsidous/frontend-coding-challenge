import { combineReducers } from 'redux';
import tournaments from './tournaments';
import query from './query';
import * as fromTournaments from '../selectors/tournaments';

const rootReducer = combineReducers({
  tournaments,
  query
});

export default rootReducer;

export const getTournaments = (state, filter) =>
  fromTournaments.getTournaments(state.tournaments, filter);
