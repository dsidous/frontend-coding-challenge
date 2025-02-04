import React from 'react';
import { array, bool, shape, oneOfType } from 'prop-types';
import styled from 'styled-components';

import theme from '../../../theme';
import Tournament from '../../molecules/Tournament';
import Loading from '../../atoms/Loading';
import Error from '../../atoms/Error';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: ${theme.spacing(6)};
`;

const TournamentList = ({ data }) => {
  if (data.error) {
    return <Error />;
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

TournamentList.propTypes = {
  data: oneOfType([
    shape({
      tournaments: array,
      loading: bool,
      error: bool
    }),
    array
  ])
};
