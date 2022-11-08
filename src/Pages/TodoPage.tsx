import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TodoType } from '../types/types';
type TodoPageProps = {};

const TodoPage = ({}: TodoPageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const param_id = searchParams.get('id');
  const navigate = useNavigate();

  const { data, status, isLoading } = useQuery('getTodo', async () => {
    const response = await axios.get(`http://localhost:3001/todos/${param_id}`);
    return response;
  });

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate(`/`);
  };

  let thisTodo: TodoType | undefined = undefined;
  if (status === 'success') thisTodo = data.data;

  return (
    <DetailSection>
      <DetailBorder>
        <BeforeButton onClick={handleClick}>이전으로</BeforeButton>

        <DetailPId>ID : {param_id}</DetailPId>
        <DetailH1>{thisTodo?.title}</DetailH1>
        <DetailH3>{thisTodo?.content}</DetailH3>
      </DetailBorder>
    </DetailSection>
  );
};
export default TodoPage;

const DetailSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DetailBorder = styled.div`
  width: 35rem;
  height: 20rem;
  border: 1px solid grey;
  padding: 1rem 2rem;

  position: relative;
`;

const DetailPId = styled.p`
  font-size: 1.2rem;
`;

const DetailH1 = styled.h1`
  font-size: 2.2rem;
  padding: 1rem 0;
`;
const DetailH3 = styled.p`
  font-size: 1.2rem;
`;

const BeforeButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2.5rem;
  background-color: transparent;
  width: 8rem;
  height: 3rem;
  border: 1px solid #c5c5c5;
  border-radius: 1rem;
`;
