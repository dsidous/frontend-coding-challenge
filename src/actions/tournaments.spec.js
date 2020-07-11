import moxios from 'moxios';
import { testStore } from '../utils';
import { fetchTournaments, createTournament } from './tournaments';
import { types } from './types';

describe('Tournaments actions', () => {
  const initialState = { query: {}, tournament: {} };
  let store;

  beforeEach(() => {
    moxios.install();
    store = testStore(initialState);
  });

  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  it('Should dispatch the fetch actions on fetch success', () => {
    const mockResponse = 'Test';
    const expectedActions = [
      { type: types.FETCH_TOURNAMENTS },
      { type: types.FETCH_TOURNAMENTS_SUCCESS, payload: mockResponse }
    ];

    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: mockResponse
      });
    });

    return store.dispatch(fetchTournaments()).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('Should dispatch the error actions on fetch error', () => {
    const mockResponse = 'Error';

    const expectedActions = [
      { type: types.FETCH_TOURNAMENTS },
      { type: types.FETCH_TOURNAMENTS_ERROR }
    ];

    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 500,
        response: mockResponse
      });
    });

    return store.dispatch(fetchTournaments()).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('Should create a new tournament', () => {});
});
