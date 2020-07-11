import { types } from '../actions/types';
import tournamentReducer from './tournaments';

describe('Tournaments Reducer', () => {
  it('Should return default state', () => {
    const newState = tournamentReducer(undefined, {});

    expect(newState).toEqual([]);
  });

  it('Should return a fetch loading state if receiving fetch loading type', () => {
    const expectedState = {
      loading: true,
      error: false
    };

    const newState = tournamentReducer(undefined, {
      type: types.FETCH_TOURNAMENTS
    });

    expect(newState).toEqual(expectedState);
  });

  it('Should return new tournaments state if receiving fetch type with success', () => {
    const tournaments = [
      { title: 'Test1' },
      { title: 'Test2' },
      { title: 'Test3' }
    ];

    const expectedState = {
      tournaments,
      loading: false,
      error: false
    };

    const newState = tournamentReducer(undefined, {
      type: types.FETCH_TOURNAMENTS_SUCCESS,
      payload: tournaments
    });

    expect(newState).toEqual(expectedState);
  });

  it('Should return error state if receiving fetch type with error', () => {
    const expectedState = {
      loading: false,
      error: true
    };

    const newState = tournamentReducer(undefined, {
      type: types.FETCH_TOURNAMENTS_ERROR
    });

    expect(newState).toEqual(expectedState);
  });
});
