import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from '../pages/QuestionDetail.module.css';
import { MdClose } from "react-icons/md";
import CommentCard from './CommentCard';
import { TbCalendarSmile } from "react-icons/tb";

function CommentModal({setIsModalOpen, questionId}) {
  const [comments, setComments] = useState([]);

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

  const renderComments = comments.map((comment, index) => {
    return <CommentCard comment={comment} key={index} />
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
        <button className={styles["comment-modal-close-button"]} onClick={closeModal}>
          <MdClose />
        </button>
        <div className={styles["comment-count"]}>댓 글 {comments.length}</div>
      </div>
      
      <div className={styles["comment-modal-content"]}>
        {renderComments}
      </div>
      
      <div className={styles["comment-modal-footer"]}>
        <form>
          <label><TbCalendarSmile /></label>
          <input 
            type='text'
            placeholder='댓글을 입력해주세요.'
          >
          </input>
          <button>
            입력
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentModal;