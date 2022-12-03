export interface TodoType {
  id: number;
  title: string | undefined;
  content: string | undefined;
  isDone: boolean;
}

type StateType = {
  todos: TodoType[];
};

export type TypeOfTodo = 'normal' | 'secret';
