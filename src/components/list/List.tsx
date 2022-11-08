import React, { ReactNode, useEffect } from 'react';
import Todo from '../todo/Todo';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { TodoType } from '../../types/types';

type ListProps = {};

const List = ({}: ListProps) => {
  // 1. useQuery
  // 'get' 메소드로 서버에 있는 데이터를 가져오는데 쓴다
  // 첫번째 인자로 고유한 값인 'key'를 주고
  // 두번째 인자로 서버로 get요청을 하는 비동기 함수를 준다
  // 값으로 data, status, isLoading, error같은 값들을 받아올 수 있다

  const { data, status, isLoading } = useQuery('getTodos', async () => {
    const response = await axios.get('http://localhost:3001/todos');
    return response;
  });

  // 2. useMutation
  // 'get'인 경우에는 useQuery를 쓰지만,
  // 'post', 'put', 'delete' 같은 메소드를 쓰려면 useMutation을 써야한다
  // 첫번째 인자로 서버로 요청하는 함수를 쓴다
  // 두번째 인자로 객체를 주는데 onSuccess, onError,
  // onMutate(mutation이 일어나기 전(그 짧은 찰나)에 실행됨), onSettled(에러 or success... doesn't matter)같은
  // 위와같은 조건 발동 시 실행시킬 수 있음
  // 여기가서 제대로 확인할 수 있다 https://react-query-v3.tanstack.com/guides/mutations

  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation(
    async (id: number) => {
      const response = await axios.delete(`http://localhost:3001/todos/${id}`);
      return response;
    },
    {
      onSuccess: () => {
        console.log('success');

        // 3. invalidQueries
        // 이걸 적어주지 않으면
        // todo를 서버에서 삭제 시켰어도
        // 삭제시킨 값이 화면에 바로 반영되지 않게 된다
        // invalidateQueries는 param에 들어있는 key값에 일치하는 요청을
        // 서버에 다시 하게된다
        // 이해를 돕기 위해서 invalidateQueries를 넣어서 실행도 해보고 주석으로 없애서 실행도 해보면
        // 어떤 쓰임인줄 알 수 있을 것이다

        queryClient.invalidateQueries('getTodos');
      },
      onError: () => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
      },
    }
  );

  const { mutate: toggleMutate } = useMutation(
    async (todo: TodoType) => {
      const response = await axios.put(
        `http://localhost:3001/todos/${todo.id}`,
        todo
      );
      return response;
    },
    {
      onSuccess: () => {
        console.log('success');
        queryClient.invalidateQueries('getTodos');
      },
      onError: () => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
      },
    }
  );

  let todos: TodoType[] = [];
  if (status === 'success') todos = data.data;

  // 4. mutate

  // redux의 dispatch와 같은 역할이라고 보면 됨
  // useMutation에서 정의한 mutate함수를 실행하고 싶은 곳에서 적어주면 된다
  // 아래와 같은 경우처럼

  const handleDelete = (id: number) => {
    deleteMutate(id);
  };

  const handleToggle = (id: number) => {
    const yes = todos.filter((value) => value.id === id); // 버튼을 누른 객체
    const yes3 = { ...yes[0], isDone: !yes[0].isDone }; // 버튼을 누른 객체의 isDone값을 !

    toggleMutate(yes3);
  };

  return (
    <ListDiv>
      <ListH1>Working.. 🔥</ListH1>

      {todos
        .filter((todo) => todo.isDone === false)
        .map((val, index) => {
          return (
            <Todo
              key={index}
              todo={val}
              handleDelete={handleDelete}
              handleToggle={handleToggle}
            />
          );
        })}

      <ListH1>Done..! 🎉</ListH1>

      {todos
        .filter((todo) => todo.isDone === true)
        .map((val, index) => {
          return (
            <Todo
              key={index}
              todo={val}
              handleDelete={handleDelete}
              handleToggle={handleToggle}
            />
          );
        })}
    </ListDiv>
  );
};
export default List;

const ListDiv = styled.section``;

const ListH1 = styled.h1`
  font-size: 1.8rem;
`;
