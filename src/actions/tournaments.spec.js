import moxios from 'moxios';
import { testStore } from '../utils';
import {
  fetchTournaments,
  createTournament,
  updateTournament,
  deleteTournament
} from './tournaments';
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

  it('Should create a new tournament', () => {
    let req;
    const newName = 'New Name';

    moxios.wait(() => {
      req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: newName
      });
    });

    return store.dispatch(createTournament(newName)).then(() => {
      const actions = store.getActions();

      expect(req.config.method).toBe('post');
      expect(req.config.data).toEqual(JSON.stringify({ name: newName }));

      expect(actions).toEqual([{ type: types.FETCH_TOURNAMENTS }]);
    });
  });

  it('Should update a tournament', () => {
    let req;
    const newName = 'New Name';
    const id = 'fakeid';

    moxios.wait(() => {
      req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: newName
      });
    });

    return store.dispatch(updateTournament(id, newName)).then(() => {
      const actions = store.getActions();

      expect(req.config.method).toBe('patch');
      expect(req.config.data).toEqual(JSON.stringify({ name: newName }));

      expect(actions).toEqual([{ type: types.FETCH_TOURNAMENTS }]);
    });
  });

  it('Should delete a tournament', () => {
    let req;
    const id = 'fakeid';

    moxios.wait(() => {
      req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: id
      });
    });

    return store.dispatch(deleteTournament(id)).then(() => {
      const actions = store.getActions();
      expect(req.config.method).toBe('delete');

      expect(actions).toEqual([{ type: types.FETCH_TOURNAMENTS }]);
    });
  });
});
