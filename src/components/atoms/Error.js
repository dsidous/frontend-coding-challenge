import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Error = () => {
  return (
    <StyledDiv>
      <p>Something went wrong</p>
      <Button onClick={() => window.location.reload()}>Retry</Button>
    </StyledDiv>
  );
};

export default Error;
