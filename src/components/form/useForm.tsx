import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { TodoType } from '../../types/types';

type useFormProps = {};

const useForm = () => {
  const [content, setContent] = useState<string | undefined>('');
  const [title, setTitle] = useState<string | undefined>('');
  const queryClient = useQueryClient();
  const { mutate: submitMutate } = useMutation(
    async (newTodo: TodoType) => {
      console.log(newTodo);
      const response = await axios.post(`http://localhost:3001/todos`, newTodo);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getTodos');
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newTodo: TodoType = {
      id: Date.now(),
      title: title,
      content: content,
      isDone: false,
    };

    submitMutate(newTodo);

    setTitle('');
    setContent('');
  };

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setContent(e.target.value);
  };

  return {
    content,
    title,

    handleSubmit,
    handleTitleChange,
    handleContentChange,
  };
};
export default useForm;
