import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './QuestionDetail.css';

const QuestionDetailPage = () => {
  const params = useParams();
  const { questionId } = params;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [nickname, setNickname] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [comments, setComments] = useState([]);
  
  const fetchQuestion = () => {
    
    axios.get(`http://localhost:3000/api/questions/${questionId}`)
    .then(response => {
      const question = response.data;

      setTitle(question.title);
      setContent(question.content);
      setCreatedAt(question.createdAt);
      setNickname(question.user.nickname);
      setBookmarks(question.bookmarks);
      setComments(question.comments);
    })
    .catch(error => {
      console.error(error);
    })
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div id='question-detail'>
      <div id='question-detail-header'>
        <h2 id='question-title'>Q. {title}</h2>
        <p id='question-createdAt'>{new Date(createdAt).toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
        <p id='question-writer'>{nickname}</p>
      </div>
      <div id='question-detail-content'>
        <p id='question-content'>{content}</p>
      </div>
      <div id='question-detail-footer'>
        <p id='question-bookmark-count'>북마크 {bookmarks.length}</p>
        <p id='question-comment-count'>댓글 {comments.length}</p>
      </div>
    </div>
  )
}

export default QuestionDetailPage;