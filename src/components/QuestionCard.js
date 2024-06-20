import React from 'react';
import './QuestionCard.css';
import { useNavigate } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";

function QuestionCard({ question }) {
  const navigate = useNavigate();

  const handleClickCard = (e) => {
    navigate(`/questions/${question.id}`);
  }
  
  return (
    <div className='question-card' onClick={handleClickCard}>
      <div className='question-card-header'>
        <h3>Q. {question.title}</h3>
      </div>
      <div className='question-info'>
        <p className='date'>{new Date(question.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <div className='counts'>
          <p className='comments-count'><FaCommentDots /> {question.comments}</p>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard;