import React, { useState } from 'react';
import './CommentCard.css';
import { RxAvatar } from "react-icons/rx";
import { AiFillLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

function CommentCard({ comment, handleDeleteButtonClick }) {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div className='comment-card' onClick={toggleContent}>
      <div className='commenter-picture'>
        <RxAvatar />
      </div>
      <div className='comment-info'>
        <p className='comment-content' style={{ whiteSpace: showFullContent ? 'normal' : 'nowrap', overflow: showFullContent ? 'visible' : 'hidden' }}>
          {comment.content}
        </p>
        <div className='comment-info-footer'>
          <p className='date'>{new Date(comment.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className='commenter'>{comment.user.nickname}</p>
        </div>
      </div>
      {comment.user.id == localStorage.getItem('userId')
        ?
        <div className='comment-buttons'>
          <button className='comment-like-button'>
            <AiFillLike /> {comment.likes.length}
          </button>
          <button className='comment-delete-button' onClick={() => handleDeleteButtonClick(comment.id)}>
            <MdDelete />
          </button>
        </div>
        :
        <div className='comment-buttons'>
          <button className='comment-like-button'>
            <AiFillLike /> {comment.likes.length}
          </button>
        </div>
      }
    </div>
  );
}

export default CommentCard;
