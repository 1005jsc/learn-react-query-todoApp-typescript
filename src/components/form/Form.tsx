import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { TodoType } from '../../types/types';
import * as F from './Form.style';

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
    <F.FormDiv onSubmit={handleSubmit}>
      <F.FormSmallDiv>
        <F.FormLabel>제목</F.FormLabel>

        <F.FormInput onChange={handleTitleChange} type='text' value={title} />
        <F.FormLabel>내용</F.FormLabel>
        <F.FormInput
          onChange={handleContentChange}
          type='text'
          value={content}
        />
      </F.FormSmallDiv>
      <F.FormButton>추가하기</F.FormButton>
    </F.FormDiv>
  );
};
export default Form;
