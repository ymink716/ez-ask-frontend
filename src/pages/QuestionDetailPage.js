import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './QuestionDetail.css';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const QuestionDetailPage = () => {
  const params = useParams();
  const { questionId } = params;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [nickname, setNickname] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [comments, setComments] = useState([]);
  const [isWriter, setIsWriter] = useState(false);

  const fetchQuestion = () => {
    
    axios.get(`http://localhost:3000/api/questions/${questionId}`)
    .then(response => {
      console.log(response.data);
      const question = response.data;

      setTitle(question.title);
      setContent(question.content);
      setCreatedAt(question.createdAt);
      setNickname(question.user.nickname);
      setBookmarks(question.bookmarks);
      setComments(question.comments);

      if (question.user.id == localStorage.getItem('userId')) {
        setIsWriter(true);
      }
    })
    .catch(error => {
      console.error(error.response);
      if (error.response.data.error === "QuestionNotFound") {
        alert('해당 질문을 찾을 수 없습니다.');
        window.location.replace('/');
      }
    })
  };

  const handleEditButtonClick = (e) => {
    window.location.replace(`/questions/edit/${questionId}`);
  } 

  const handleDeleteButtonClick = (e) => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios.delete(`http://localhost:3000/api/questions/${questionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      ).then((response) => {
        if (response.data.success) {
          alert('삭제했습니다!');
          window.location.replace('/');
        }
      }).catch((error) => {
        console.error(error);
        alert('질문글 삭제에 실패했습니다.');
      })
    }
  }

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
      {isWriter 
        ?
        <div id='question-detail-footer'>
          <button id='edit-question-button' onClick={handleEditButtonClick}>
            <MdEdit />
          </button>
          <button id='delete-question-button' onClick={handleDeleteButtonClick}>
            <MdDelete />
          </button>
          <p id='question-bookmark-count'>북마크 {bookmarks.length}</p>
          <p id='question-comment-count'>댓글 {comments.length}</p>
        </div>      
        :
        <div id='question-detail-footer'>
          <p id='question-bookmark-count'>북마크 {bookmarks.length}</p>
          <p id='question-comment-count'>댓글 {comments.length}</p>
        </div>
      }
    </div>
  )
}

export default QuestionDetailPage;