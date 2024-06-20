import React, { useState } from 'react';
import './CommentCard.css';
import { RxAvatar } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import LikeButton from './LikeButton';

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
          {comment.likes && <LikeButton likes={comment.likes} commentId={comment.id} />}
          <button className='comment-delete-button' onClick={() => handleDeleteButtonClick(comment.id)}>
            <MdDelete />
          </button>
        </div>
        :
        <div className='comment-buttons'>
          {comment.likes && <LikeButton likes={comment.likes} commentId={comment.id} />}
        </div>
      }
    </div>
  );
}

export default CommentCard;
