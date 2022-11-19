import { useQueryClient } from 'react-query';

// getQueryData, refetchQueries, invalidQueries 같은 api들은
// useQueryClient()를 실행해줘야만 실행시킬 수 있다
// 코드를 깔끔하게 정리하기 위해서 하나의 hooks로 넣는다

// 참고 https://stackoverflow.com/questions/67091583/react-query-how-can-i-access-my-queries-in-multiple-components

export const useGetQueryData = (key: string | any[]) => {
  return useQueryClient().getQueryData(key);
};

export const useRefetchQueries = (key: string | any[]) => {
  return useQueryClient().refetchQueries(key);
};
export const useinvalidQueries = (key: string | any[]) => {
  return useQueryClient().invalidateQueries(key);
};
