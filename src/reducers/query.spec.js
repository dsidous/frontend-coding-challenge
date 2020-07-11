import { types } from '../actions/types';
import queryReducer from './query';

describe('Query Reducer', () => {
  it('Should return default state', () => {
    const newState = queryReducer(undefined, {});

    expect(newState).toEqual([]);
  });

  it('Should return new query state if receiving query type', () => {
    const query = 'Test';

    const expectedState = {
      query
    };

    const newState = queryReducer(undefined, {
      type: types.QUERY,
      payload: { query }
    });

    expect(newState).toEqual(expectedState);
  });
});
