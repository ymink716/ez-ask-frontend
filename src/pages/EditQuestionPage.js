import React from 'react';
import { useForm } from 'react-hook-form';
import './EditQuestionPage.css';
import axios from 'axios';
import { IoMdCreate } from "react-icons/io";
import { useLocation, useParams } from 'react-router-dom';



const EditQuestionPage = () => {
  const location = useLocation();
  const { title, content } = location.state;
  const { questionId } = useParams();

  const { register, handleSubmit, formState: { isValid, errors }, setError } = useForm({
    defaultValues: { title, content }
  });

  const onValid = (data) => {
    let isValid = true;

    if (data.title.trim().length < 2) {
      setError(
        'title',
        { message: '제목은 2글자 이상이어야 합니다.'},
        { shouldFocus: true },
      );
      isValid = false;
    }

    if (data.content.trim().length < 2) {
      setError(
        'content',
        { message: '내용은 2글자 이상이어야 합니다.'},
        { shouldFocus: true },
      );
      isValid = false;
    }

    return isValid;
  }

  const onSubmit = async (data) => {
    if (!onValid(data)) {
      return;
    }

    await axios.put(
      `http://localhost:3000/api/questions/${questionId}`,
      {
        title: data.title,
        content: data.content
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    ).then((response) => {
      alert('변경되었습니다!');
      window.location.replace(`/questions/${questionId}`);
    }).catch((error) => {
      console.error(error.response);

      if (error.response.data.error === "IsNotQuestionWriter") {
        alert('접근 권한이 없습니다.');
        window.location.replace('/');
      } else {
        alert('에러가 발생했습니다.');
      }
    })
  };

  return (
    <div id='edit-question'>
      <div id='edit-question-header'>
        <h2>수정하기</h2>
      </div>
      
      <div id='edit-question-content'>
        <form id='edit-question-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group-title'>
            <label>Q. </label>
            <input 
              type='text'
              placeholder='제목을 입력하세요' 
              {...register('title', { 
                required: true, 
                minLength: {
                  value: 2,
                  message: '제목은 2글자 이상이어야 합니다',
                }, 
                maxLength: {
                  value: 50,
                  message: '제목은 50글자 이하여야 합니다.',
                },
              })}
            />
          </div>
          {errors.title && <span>{errors.title.message}</span>}

          <textarea
            placeholder='내용을 작성하세요'
            {...register('content', { 
              required: '내용은 2글자 이상 500글자 이하여야 합니다.', 
              minLength: {
                value: 2,
                message: '내용은 2글자 이상이어야 합니다',
              }, 
              maxLength: {
                value: 500,
                message: '내용은 500글자 이하여야 합니다.',
              },
            })}
          />
          {errors.content && <span>{errors.content.message}</span>}
          
          <button type='submit' disabled={!isValid}>
            <IoMdCreate />
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditQuestionPage;
