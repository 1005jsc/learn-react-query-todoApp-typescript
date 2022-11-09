import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { TodoType } from '../../types/types';
import useForm from './useForm';

type FormProps = {};

const Form = ({}: FormProps) => {
  const {
    content,
    title,
    handleSubmit,
    handleTitleChange,
    handleContentChange,
  } = useForm();

  return (
    <FormDiv onSubmit={handleSubmit}>
      <FormSmallDiv>
        <FormLabel>제목</FormLabel>

        <FormInput onChange={handleTitleChange} type='text' value={title} />
        <FormLabel>내용</FormLabel>
        <FormInput onChange={handleContentChange} type='text' value={content} />
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
