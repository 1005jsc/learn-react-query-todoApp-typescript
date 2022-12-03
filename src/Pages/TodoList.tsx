import React, { ReactNode } from 'react';
import Form from '../components/form/Form';
import Header from '../components/header/Header';
import Layout from '../components/layout/Layout';
import Todo from '../components/todo/Todo';
import styled from 'styled-components';
import List from '../components/list/List';

type TodoListProps = {
  children?: ReactNode;
};

const TodoList = ({ children }: TodoListProps) => {
  return (
    <>
      <LayoutDiv>
        <Header />
        <Form />
        <List></List>
      </LayoutDiv>
    </>
  );
};
export default TodoList;

const LayoutDiv = styled.section`
  width: 100wh;
  min-height: 800px;
  max-height: 1200px;
  padding: 0 16rem;
  padding-bottom: 30rem;
`;
