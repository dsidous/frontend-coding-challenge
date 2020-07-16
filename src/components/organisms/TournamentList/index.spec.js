import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TournamentList from './';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch
}));

describe('TournamentList', () => {
  let data;
  mockDispatch.mockReturnValue(data);

  beforeEach(() => {
    data = {
      tournaments: [
        {
          id: 'mock id',
          name: 'mock name',
          organizer: 'mock organizer',
          game: 'mock game',
          participants: {
            current: 1,
            max: 2
          },
          startDate: '2020.12.12 10:10:10'
        },
        {
          id: 'mock id2',
          name: 'mock name',
          organizer: 'mock organizer',
          game: 'mock game',
          participants: {
            current: 1,
            max: 2
          },
          startDate: '2020.12.12 10:10:10'
        }
      ]
    };
  });

  it('Should render as expected', () => {
    const { asFragment } = render(<TournamentList {...{ data }} />);
    expect(asFragment).toMatchSnapshot();
  });

  it('Should show the loading screen', () => {
    data.loading = true;
    const { getByText } = render(<TournamentList {...{ data }} />);

    expect(getByText('Loading Tournaments...')).toBeTruthy();
  });

  it('Should show the error screen', () => {
    data.error = true;
    const { getByText } = render(<TournamentList {...{ data }} />);

    expect(getByText('Something went wrong')).toBeTruthy();
  });
});
