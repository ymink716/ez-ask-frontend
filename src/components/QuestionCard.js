import React from 'react';
import './QuestionCard.css';

function QuestionCard({ question, index }) {
  return (
    <div className='question-card'>
      <h3>Q. {question.title}</h3>
      <div className='question-info'>
        <p className='date'>{new Date(question.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <div className='counts'>
          <p>좋아요 {question.likes}</p>
          <p>북마크 {question.bookmarks}</p>
          <p>댓글 {question.comments}</p>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard;