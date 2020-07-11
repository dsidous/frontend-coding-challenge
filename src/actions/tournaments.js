import { types } from './types';
import axios from 'axios';
import { API_TOURNAMENTS_URL } from '../constants/api';

export const fetchTournaments = () => async (dispatch, getState) => {
  const query = getState().query.query || '';

  try {
    dispatch({
      type: types.FETCH_TOURNAMENTS
    });

    const response = await axios.get(`${API_TOURNAMENTS_URL}?q=${query}`);
    const data = await response.data;

    dispatch({
      type: types.FETCH_TOURNAMENTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_TOURNAMENTS_ERROR
    });
  }
};

export const createTournament = newName => async dispatch => {
  try {
    await axios.post(`${API_TOURNAMENTS_URL}`, { name: newName });
    dispatch(fetchTournaments());
  } catch (error) {
    dispatch({
      type: types.CREATE_TOURNAMENT_ERROR
    });
  }
};

export const updateTournament = (id, newName) => async dispatch => {
  try {
    await axios.patch(`${API_TOURNAMENTS_URL}/${id}`, { name: newName });
    dispatch(fetchTournaments());
  } catch (error) {
    dispatch({
      type: types.UPDATE_TOURNAMENT_ERROR
    });
  }
};

export const deleteTournament = id => async dispatch => {
  try {
    await axios.delete(`${API_TOURNAMENTS_URL}/${id}`);
    dispatch(fetchTournaments());
  } catch (error) {
    dispatch({
      type: types.DELETE_TOURNAMENT_ERROR
    });
  }
};
