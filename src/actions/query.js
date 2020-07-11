import { types } from './types';
import { fetchTournaments } from './tournaments';

export const addQuery = query => async dispatch => {
  try {
    dispatch({
      type: types.QUERY,
      payload: { query }
    });
    dispatch(fetchTournaments());
  } catch (error) {
    console.log(error);
  }
};
