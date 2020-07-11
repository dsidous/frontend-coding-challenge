import moxios from 'moxios';
import { testStore } from '../utils';
import { addQuery } from './query';
import { types } from './types';

describe('Query actions', () => {
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

  it('Should dispatch the Query action', () => {
    const query = 'Test';
    const expectedActions = [
      { type: types.QUERY, payload: { query } },
      { type: types.FETCH_TOURNAMENTS }
    ];

    return store.dispatch(addQuery(query)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
