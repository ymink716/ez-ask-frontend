import React, { useState } from 'react';
import './CommentCard.css';
import { RxAvatar } from "react-icons/rx";
import { AiFillLike } from "react-icons/ai";

function CommentCard({ comment }) {
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
        <p className='date'>{new Date(comment.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <button className='comment-like-button'>
        <AiFillLike /> {comment.likes.length}
      </button>
    </div>
  );
}

export default CommentCard;
