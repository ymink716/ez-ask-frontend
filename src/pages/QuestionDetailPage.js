import React from 'react';
import { useParams } from 'react-router-dom';

const QuestionDetailPage = () => {
  const params = useParams();
  const { questionId } = params;

  return (
    <div>질문 상세 페이지 {questionId}</div>
  )
}

export default QuestionDetailPage;