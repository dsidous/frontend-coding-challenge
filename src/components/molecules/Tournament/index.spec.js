import React from 'react';
import { shallow } from 'enzyme';

import Tournament from './index';
import * as tournament from '../../../actions/tournaments';
import { findByTestAtrr } from '../../../utils';

tournament.deleteTournament = jest.fn();
tournament.updateTournament = jest.fn();

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch
}));

describe('molecules/Tournament', () => {
  let wrapper;
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

  beforeEach(() => {
    wrapper = shallow(<Tournament {...mockProps} />);
  });

  it('Should render as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('On Delete', () => {
    let confirmSpy;
    let deleteBtn;

    beforeEach(() => {
      deleteBtn = findByTestAtrr(wrapper, 'buttonDelete');
      confirmSpy = jest.spyOn(window, 'confirm');
      confirmSpy.mockImplementation(jest.fn(() => true));
    });

    afterEach(() => {
      confirmSpy.mockRestore();
      jest.clearAllMocks();
    });

    it('Should call the confirm window', () => {
      deleteBtn.simulate('click');
      expect(confirmSpy).toBeCalled();
    });

    it('Should dispatch action with the id if clicked OK in the confirm window', () => {
      deleteBtn.simulate('click');
      expect(tournament.deleteTournament).toBeCalledWith(
        mockProps.tournament.id
      );
    });

    it("Shouldn't dispatch action if clicked Cancel in the confirm window", () => {
      confirmSpy.mockImplementation(jest.fn(() => false));

      deleteBtn.simulate('click');
      expect(tournament.deleteTournament).not.toBeCalled();
    });
  });

  describe('On Edit', () => {
    let promptSpy;
    let editBtn;
    const newName = 'New Mock Name';

    beforeEach(() => {
      editBtn = findByTestAtrr(wrapper, 'buttonEdit');
      promptSpy = jest.spyOn(window, 'prompt');
      promptSpy.mockImplementation(jest.fn(() => newName));
    });

    afterEach(() => {
      promptSpy.mockRestore();
      jest.clearAllMocks();
    });

    it('Should call the prompt window', () => {
      editBtn.simulate('click');
      expect(promptSpy).toBeCalled();
    });

    it('Should dispatch action with the id and the new name if clicked OK in the prompt window', () => {
      editBtn.simulate('click');
      expect(tournament.updateTournament).toBeCalledWith(
        mockProps.tournament.id,
        newName
      );
    });

    it("Shouldn't dispatch action if clicked Cancel in the prompt window", () => {
      promptSpy.mockImplementation(jest.fn(() => false));

      editBtn.simulate('click');
      expect(tournament.updateTournament).not.toBeCalled();
    });
  });
});
