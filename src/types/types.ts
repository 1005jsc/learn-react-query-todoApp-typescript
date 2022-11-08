export type TodoType = {
  id: number;
  title: string | undefined;
  content: string | undefined;
  isDone: boolean;
};

type StateType = {
  todos: TodoType[];
};
