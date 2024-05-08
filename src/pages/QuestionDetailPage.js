import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuestionDetailPage = () => {
  const params = useParams();
  const { questionId } = params;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [nickname, setNickname] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [likes, setLikes] = useState([]);
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
      setLikes(question.likes);
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
      <div>질문 상세 페이지 {questionId}</div>
      <p>Q. {title}</p>
      <p>내용. {content}</p>
      <p>생성일 {new Date(createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p>작성자 {nickname}</p>
      <p>북마크 수. {bookmarks.length}</p>
      <p>좋아요 수. {likes.length}</p>
      <p>댓글 수. {comments.length}</p>
    </div>
    
  )
}

export default QuestionDetailPage;