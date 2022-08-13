import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';


export const Load: React.FC = () => {
  

  return (
    <Container>
      <ActivityIndicator 
        color='#5636d3'
        size="large"
      />
    </Container>
  );
}
export const Container = styled.View`
  flex:1;
  justify-content: center;
  align-items:center;
`;