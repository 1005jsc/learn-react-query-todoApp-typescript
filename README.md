# 리엑트 쿼리 연습

## MISSION:

데이터는 서버에 저장한다는 조건으로 react typescript이용한 TodoApp을 만들어 보자

그리고 비동기 상태관리로 리엑트 쿼리를 사용해보자

지금까지 redux로 동기, 비동기 둘 다 관리를 해왔는데 react-query가 훨씬 관리하기 좋다라는 평을 들었다

실제로 만들고 나니 왜 사람들이 react-query를 추천하는줄 알 수 있었다

자세한 설명은 코드안에 주석들을 보시면 됩니다

### 기타:

서버 : json-server
서버 명령어 : yarn json-server --watch db.json --port 3001
css : styled-components

## 내용

1. useQuery

- List.tsx

2.  useMutation

- List.tsx, useForm.tsx

3. invalidQueries

   - List.tsx

4. mutate

- List.tsx

5. 이미 한번 요청했던 값을 다른 컴포넌트에서 받아보기
   - TodoPage.tsx
