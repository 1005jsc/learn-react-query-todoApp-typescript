import React from 'react';
import styled from 'styled-components';

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  return (
    <HeaderHeader>
      <HeaderP1>재신's Todo List</HeaderP1>
      <HeaderP1>React</HeaderP1>
    </HeaderHeader>
  );
};
export default Header;

const HeaderHeader = styled.div`
  padding: 0 3rem;
  border: 1px solid grey;
  display: flex;
  justify-content: space-between;
`;

const HeaderP1 = styled.p`
  color: grey;
`;
