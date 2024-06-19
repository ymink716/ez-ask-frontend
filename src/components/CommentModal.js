import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from '../pages/QuestionDetail.module.css';
import { MdClose } from "react-icons/md";
import CommentCard from './CommentCard';
import { TbCalendarSmile } from "react-icons/tb";
import { useForm } from 'react-hook-form';
import { TbMessage } from "react-icons/tb";

function CommentModal({setIsModalOpen, questionId}) {
  const [comments, setComments] = useState([]);
  const { register, handleSubmit, formState: { isValid, errors }, setError } = useForm();

  const onValid = (data) => {
    let isValid = true;

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

    await axios.post(
      `http://localhost:3000/api/comments`,
      {
        content: data.content,
        questionId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    ).then((response) => {
      fetchComments();
    }).catch((error) => {
      console.error(error.response);
      alert('에러가 발생했습니다.');
    })
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    axios.get(`http://localhost:3000/api/comments/question/${questionId}`)
    .then((response) => {
      setComments(response.data);
    })
    .catch((error) => {
      console.error(error.response);
      alert('에러가 발생했습니다.');
    })
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const handleDeleteButtonClick = (commentId) => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios.delete(`http://localhost:3000/api/comments/${commentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      ).then((response) => {
        if (response.data.success) {
          alert('삭제되었습니다.');
          fetchComments();
        }
      }).catch((error) => {
        console.error(error.response);

        if (error.response.data.error === "IsNotCommentor") {
          alert('접근 권한이 없습니다.');
          window.location.replace('/');
        } else {
          alert('에러가 발생했습니다.');
        }
      });
    }
  }

  const renderComments = comments.map((comment, index) => {
    return <CommentCard comment={comment} key={index} handleDeleteButtonClick={handleDeleteButtonClick} />
  });

  const modalRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handler);
    
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <div ref={modalRef} className={styles["comment-modal-container"]}>
      <div className={styles["comment-modal-header"]}>
        <div className={styles["comment-count"]}>댓 글 {comments.length}</div>
        <button className={styles["comment-modal-close-button"]} onClick={closeModal}>
          <MdClose />
        </button>
      </div>
      
      <div className={styles["comment-modal-content"]}>
        {renderComments}
      </div>
      
      <div className={styles["comment-modal-footer"]}>
        <form className={styles["write-comment-form"]} onSubmit={handleSubmit(onSubmit)}>
          <label><TbCalendarSmile /></label>
          <input 
            type='text'
            placeholder='댓글을 입력해주세요.'
            {...register('content', { 
              required: '내용은 2글자 이상 255글자 이하여야 합니다.', 
              minLength: {
                value: 2,
                message: '내용은 2글자 이상이어야 합니다',
              }, 
              maxLength: {
                value: 255,
                message: '내용은 255글자 이하여야 합니다.',
              },
            })}
          >
          </input>
          {errors.content && <span>{errors.content.message}</span>}
          <button type='submit' disabled={!isValid}><TbMessage /></button>
        </form>
      </div>
    </div>
  );
}

export default CommentModal;