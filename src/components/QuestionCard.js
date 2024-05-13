import React from 'react';
import './QuestionCard.css';
import { useNavigate } from "react-router-dom";

function QuestionCard({ question }) {
  const navigate = useNavigate();

  const handleClickCard = (e) => {
    navigate(`/questions/${question.id}`);
  }
  
  return (
    <div className='question-card' onClick={handleClickCard}>
      <h3>Q. {question.title}</h3>
      <div className='question-info'>
        <p className='date'>{new Date(question.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <div className='counts'>
          <p>북마크 {question.bookmarks}</p>
          <p>댓글 {question.comments}</p>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard;