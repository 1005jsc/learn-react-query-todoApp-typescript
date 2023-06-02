import React, { ReactNode, useEffect, useState } from "react";
import Todo from "../todo/Todo";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { TodoType } from "../../types/types";

type ListProps = {};

const List = ({}: ListProps) => {
  // 1. useQuery
  // 'get' 메소드로 서버에 있는 데이터를 가져오는데 쓴다
  // 첫번째 인자로 고유한 값인 'key'를 주고
  // 두번째 인자로 서버로 get요청을 하는 비동기 함수를 준다
  // 값으로 data, status, isLoading, error같은 값들을 받아올 수 있다

  const { data: todos } = useQuery<TodoType[]>("getTodos", async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/todos`
    );
    return response.data;
  });

  // 9. useQuery를 동적으로 받기
  // useQuery로 GET 해올 때 요청하는 값이 동적으로 바뀌는 경우가 있을 수 있다
  // 이럴 떄 보통 2가지 방법이 있다
  // 1. 바뀌어야 할 변수를 useState로 관리, state가 바뀌고 나서 수동으로 refetch를 한다
  // 2. queryKey를 배열로 만들고 두번째 인자에 변수를 넣는다. state변수의 값이 바뀌면
  //     key가 바뀌는 것이기때문에 useQuery가 refetch된다. 한마디로 자동으로 refetch를 함
  //     queryKey[1]와 같이 변수 값을 받아 올 수 있음

  const [page, setPage] = useState(2);

  const fetchCharacters = async ({ queryKey }: any) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );
    return response.json();
  };
  const { data, status } = useQuery(["characters", page], fetchCharacters);

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
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/todos/${id}`
      );
      return response;
    },
    {
      onSuccess: () => {
        console.log("success");

        // 3. invalidQueries
        // 이걸 적어주지 않으면
        // todo를 서버에서 삭제 시켰어도
        // 삭제시킨 값이 화면에 바로 반영되지 않게 된다
        // invalidateQueries는 param에 들어있는 key값에 일치하는 요청을
        // 서버에 다시 하게된다
        // 이해를 돕기 위해서 invalidateQueries를 넣어서 실행도 해보고 주석으로 없애서 실행도 해보면
        // 어떤 쓰임인줄 알 수 있을 것이다

        queryClient.invalidateQueries("getTodos");
      },
      onError: () => {
        console.log("이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요");
      },
    }
  );

  const { mutate: toggleMutate } = useMutation(
    async (todo: TodoType) => {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/todos/${todo.id}`,
        todo
      );
      return response;
    },
    {
      onSuccess: () => {
        console.log("success");
        queryClient.invalidateQueries("getTodos");
      },
      onError: () => {
        console.log("이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요");
      },
    }
  );

  // let todos: TodoType[] = [];
  // if (status === 'success') todos = data.data;

  // 4. mutate

  // redux의 dispatch와 같은 역할이라고 보면 됨
  // useMutation에서 정의한 mutate함수를 실행하고 싶은 곳에서 적어주면 된다
  // 아래와 같은 경우처럼

  const handleDelete = (id: number) => {
    deleteMutate(id);
  };

  const handleToggle = (id: number) => {
    if (!todos) return;

    const yes = todos.filter((value) => value.id === id); // 버튼을 누른 객체
    const yes3 = { ...yes[0], isDone: !yes[0].isDone }; // 버튼을 누른 객체의 isDone값을 !

    toggleMutate(yes3);
  };

  // 8. enabled: false, refetch로 useQuery 작동을 수동적으로 관리하기
  // useQuery는 hook이기 때문에 컴포넌트 내의 함수로 들어 가거나 useEffect안에 들어갈 수 없다
  // 그래서 아무 옵션 없이 useQuery를 컴포넌트 상단에 정의를 해주면
  // 컴포넌트가 update될때마다 실행되어지게 된다 get요청이 불필요할때에도 useQuery가 실행될 수 있다는 이야기이다
  // 또, 버튼 클릭과 같은 특정 이벤트가 실행될 경우에만 useQuery를 통한 get요청을 하고 싶을 경우도 있을 것이다
  // 이런 경우에는 ...

  // (1) 옵션자리(useQuery의 세번째 param자리)에 enable: false옵션을 추가해준다
  // enabled: false -> 자동요청을 끄고 수동 요청에만 useQuery가 실행될수 있도록 한다

  // (2) useQuery가 리턴하는 api 중 refetch함수를 이용한다
  // 여기에서는 refetch함수를 secretTodosFetch라고 정의하고,
  // get요청을 일으키고 싶은 곳에 secretTodosFetch를 호출해주면 된다
  // 그렇게 되면 원하는 곳에 원하는 시점에 useQuery를 컨트롤 할 수 있게 된다

  const { data: secretTodos, refetch: secretTodosFetch } = useQuery<TodoType[]>(
    "getSecretTodos",
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/secret_todos`
      );
      return response.data;
    },
    {
      // 기본값: 브라우저 화면을 재방문시 useQuery다시 요청함 -> 요청 안함
      refetchOnWindowFocus: false,
      // 8 - (1) : useQuery의 동작을 수동으로 바꿈
      enabled: false,
      // 기본값: retry를 3번까지 다시 요청 -> 다시요청 안함
      retry: 0,
      onSuccess: () => {},
      onError: () => {},
    }
  );

  const [secretTodosToggle, setSecretTodosToggle] = useState<boolean>(false);
  const handleSecretClick = () => {
    if (!secretTodosToggle) {
      // 8 - (2) 의 내용: secretTodosFetch 호출하기
      secretTodosFetch();
    }
    setSecretTodosToggle(!secretTodosToggle);
  };

  return (
    <ListDiv>
      <div></div>

      <ListH1>Working.. 🔥</ListH1>

      {todos &&
        todos
          .filter((todo) => todo.isDone === false)
          .map((val, index) => {
            return (
              <Todo
                typeOfTodo='normal'
                key={val.id}
                todo={val}
                handleDelete={handleDelete}
                handleToggle={handleToggle}
              />
            );
          })}

      <ListH1>Done..! 🎉</ListH1>

      {todos &&
        todos
          .filter((todo) => todo.isDone === true)
          .map((val, index) => {
            return (
              <Todo
                typeOfTodo='normal'
                key={val.id}
                todo={val}
                handleDelete={handleDelete}
                handleToggle={handleToggle}
              />
            );
          })}

      <ListH1 onClick={handleSecretClick}>Secret Todos.. 🕶 </ListH1>

      {secretTodosToggle &&
        secretTodos &&
        secretTodos.map((val, index) => {
          return (
            <Todo
              typeOfTodo='secret'
              key={val.id}
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
