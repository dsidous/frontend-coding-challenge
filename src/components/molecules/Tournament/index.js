import React from 'react';
import { useDispatch } from 'react-redux';
import { number, shape, string } from 'prop-types';
import styled from 'styled-components';

import {
  deleteTournament,
  updateTournament
} from '../../../actions/tournaments';
import theme from '../../../theme';
import H6 from '../../atoms/H6';
import Button from '../../atoms/Button';

const StyledDiv = styled.div`
  background-color: ${theme.palette.background.base};
  padding: ${theme.spacing(3)};
`;

const List = styled.ul`
  padding: 0;
  list-style: none;
  margin-bottom: ${theme.spacing(2)};
`;

const ButtonEdit = styled(Button)`
  margin-right: ${theme.spacing(2)};
`;

const timeOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false
};

const Tournament = ({
  tournament: { id, name, organizer, game, participants, startDate }
}) => {
  const dispatch = useDispatch();
  const startDateFormatted = new Date(startDate).toLocaleDateString(
    'en-GB',
    timeOptions
  );

  return (
    <StyledDiv>
      <H6>{name}</H6>
      <List>
        <li>Organizer: {organizer}</li>
        <li>Game: {game}</li>
        <li>
          Participants: {participants.current}/{participants.max}
        </li>
        <li>Start: {startDateFormatted}</li>
      </List>
      <div>
        <ButtonEdit
          onClick={() => {
            const newName = window.prompt('New Tournament Name:', name);
            if (newName) {
              dispatch(updateTournament(id, newName));
            }
          }}
        >
          Edit
        </ButtonEdit>
        <Button
          onClick={() =>
            window.confirm('Do you really want to delete this tournament?') &&
            dispatch(deleteTournament(id))
          }
        >
          Delete
        </Button>
      </div>
    </StyledDiv>
  );
};

export default Tournament;

Tournament.propTypes = {
  tournament: shape({
    id: string,
    name: string,
    organizer: string,
    game: string,
    participants: shape({
      current: number,
      max: number
    }),
    startDate: string
  })
};
