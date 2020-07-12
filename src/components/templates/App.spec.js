import React from 'react';
import { shallow, mount } from 'enzyme';

import App from './App';
import * as tournament from '../../actions/tournaments';
import * as query from '../../actions/query';
import { findByTestAtrr } from '../../utils';

tournament.fetchTournament = jest.fn();
tournament.createTournament = jest.fn();

query.addQuery = jest.fn();

const mockProps = {
  tournament: {
    id: 'mock id',
    name: 'mock name',
    organizer: 'mock organizer',
    game: 'mock game',
    participants: {
      current: 1,
      max: 2
    },
    startDate: '2020.12.12 10:10:10'
  }
};

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => ({ ...mockProps })),
  useDispatch: () => jest.fn()
}));

describe('templates/App', () => {
  let wrapper;

  it('Should render as expected', () => {
    wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('On Create new tournament', () => {
    let promptSpy;
    let createBtn;
    const newName = 'New Mock Name';

    beforeEach(() => {
      wrapper = shallow(<App />);
      createBtn = findByTestAtrr(wrapper, 'buttonCreate');
      promptSpy = jest.spyOn(window, 'prompt');
      promptSpy.mockImplementation(jest.fn(() => newName));
      jest.spyOn(tournament, 'createTournament');
    });

    afterEach(() => {
      promptSpy.mockRestore();
      jest.clearAllMocks();
    });

    it('Should call the prompt window', () => {
      createBtn.simulate('click');
      expect(promptSpy).toBeCalled();
    });

    it('Should dispatch action with the new name if clicked OK in the prompt window', () => {
      createBtn.simulate('click');
      expect(tournament.createTournament).toBeCalledWith(newName);
    });

    it("Shouldn't dispatch action if clicked Cancel in the prompt window", () => {
      promptSpy.mockImplementation(jest.fn(() => false));

      createBtn.simulate('click');
      expect(mockDispatch).not.toBeCalled();
    });

    describe('On Search', () => {
      it('Should dispath action on submit with the query', async () => {
        wrapper = mount(<App />);
        const querySpy = jest.spyOn(query, 'addQuery');

        const queryMock = 'mock query';
        const input = findByTestAtrr(wrapper, 'searchInput').find('input');
        const form = findByTestAtrr(wrapper, 'searchForm');

        input.instance().value = queryMock;
        input.simulate('change', { target: { value: queryMock } });
        form.simulate('submit', { preventDefault: jest.fn() });

        expect(querySpy).toBeCalledWith(queryMock);

        querySpy.mockRestore();
      });
    });
  });
});
