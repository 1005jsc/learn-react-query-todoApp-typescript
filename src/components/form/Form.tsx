import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { TodoType } from '../../types/types';

type FormProps = {};

const Form = ({}: FormProps) => {
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

  const handleChange1: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleChange2: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setContent(e.target.value);
  };

  return (
    <FormDiv onSubmit={handleSubmit}>
      <FormSmallDiv>
        <FormLabel>제목</FormLabel>

        <FormInput onChange={handleChange1} type='text' value={title} />
        <FormLabel>내용</FormLabel>
        <FormInput onChange={handleChange2} type='text' value={content} />
      </FormSmallDiv>
      <FormButton>추가하기</FormButton>
    </FormDiv>
  );
};
export default Form;

const FormDiv = styled.form`
  width: 100%;
  height: 8rem;
  background-color: #e9e9e9;
  border-radius: 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormSmallDiv = styled.div`
  display: flex;
  align-items: center;
  padding-left: 2rem;
`;
const FormLabel = styled.label`
  font-size: 1.2rem;
  margin-right: 1rem;
`;
const FormInput = styled.input`
  margin-right: 1rem;
  height: 2.4rem;
  border-radius: 0.6rem;
  width: 15rem;
  font-size: 1.4rem;
  padding-left: 0.5rem;
`;

const FormButton = styled.button`
  width: 9rem;
  height: 2.6rem;
  color: white;
  background-color: #008080;
  margin-right: 2.6rem;
  border-radius: 0.8rem;
`;
