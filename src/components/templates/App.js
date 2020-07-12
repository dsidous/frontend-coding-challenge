import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchTournaments, createTournament } from '../../actions/tournaments';
import { addQuery } from '../../actions/query';

import Container from '../atoms/Container';
import H4 from '../atoms/H4';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import TournamentList from '../organisms/TournamentList';
import { getTournaments } from '../../reducers';

import theme from '../../theme';

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing(3)};
`;

const App = () => {
  const [query, setQuery] = useState('');

  const data = useSelector(state => getTournaments(state));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTournaments());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addQuery(query));
  };

  const newTournament = () => {
    const newName = window.prompt('Tournament Name:');
    if (newName) {
      dispatch(createTournament(newName));
    }
  };

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <Container>
        <StyledContainer>
          <form onSubmit={handleSubmit} data-test="searchForm">
            <Input
              data-test="searchInput"
              placeholder="Search tournament..."
              onChange={e => setQuery(e.target.value)}
              value={query}
            />
          </form>
          <Button data-test="buttonCreate" onClick={newTournament}>
            Create Tournament
          </Button>
        </StyledContainer>
        <TournamentList data={data} />
      </Container>
    </Container>
  );
};

export default App;
