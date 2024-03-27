import React from 'react';

function Question({ question }) {
  return (
    <>
      <p>Q. {question.title}</p>
      <p>{new Date(question.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p>좋아요 {question.likes}</p>
      <p>북마크 {question.bookmarks}</p>
      <p>댓글 {question.comments}</p>
    </>
  )
}

export default Question;