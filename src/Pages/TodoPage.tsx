import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetQueryData } from '../hooks/ReactQueryHooks/ReactQueryHooks';
import { TodoType } from '../types/types';
type TodoPageProps = {};

const TodoPage = ({}: TodoPageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const param_id = searchParams.get('id');
  const navigate = useNavigate();

  // 5. 이미 한번 요청했던 값을 다른 컴포넌트에서 받아보기
  // List.tsx에서 요청했던 'getTodos'를
  // 전혀 다른 컴포넌트인 'TodoPage'에서 받아보기

  // useQuery에 확인하고 싶은 key값을 넣어주면 된다
  // 이 경우엔 'getTodos'를 넣어보았다 (List.tsx에서 요청한 적이 있다)
  // react-query도 다른 상태관리 라이브러리 처럼 state를 전역적으로 관리하고 있기 때문이다

  // const { data: datayo } = useQuery('getTodos');
  // console.log(datayo);

  // 6. getQueryData()

  // 이미 useQuery로 받은 데이터는 key값만 적어주면 getQueryData로 받아올 수 있다

  // useQueryClient
  // https://stackoverflow.com/questions/67091583/react-query-how-can-i-access-my-queries-in-multiple-components

  // const queryClient = useQueryClient();

  // const yo = queryClient.getQueryData('getTodos');

  const yo = useGetQueryData('getTodo');

  console.log(yo);

  const { data, status, isLoading } = useQuery('getTodo', async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/todos/${param_id}`
    );
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
