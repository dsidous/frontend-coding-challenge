import React from 'react';
import styled from 'styled-components';

import theme from '../../../theme';
import Tournament from '../../molecules/Tournament';
import Loading from '../../atoms/Loading';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: ${theme.spacing(6)};
`;

const TournamentList = ({ data }) => {
  if (data.error) {
    return <div>Something went wrong.</div>;
  }

  if (data.loading) {
    return <Loading />;
  }

  return (
    <StyledDiv>
      {data.tournaments &&
        data.tournaments.map(tournament => (
          <Tournament tournament={tournament} key={tournament.id} />
        ))}
    </StyledDiv>
  );
};

export default TournamentList;
