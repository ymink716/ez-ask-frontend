import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './QuestionDetail.module.css';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaCommentDots } from "react-icons/fa";
import CommentModal from '../components/CommentModal';
import BookmarkButton from '../components/BookmarkButton';
import { AiOutlineEye } from "react-icons/ai";

const QuestionDetailPage = () => {
  const params = useParams();
  const { questionId } = params;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [views, setViews] = useState(0);
  const [createdAt, setCreatedAt] = useState("");
  const [nickname, setNickname] = useState("");
  const [bookmarks, setBookmarks] = useState();
  const [comments, setComments] = useState([]);
  const [isWriter, setIsWriter] = useState(false);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestion = async () => {
    await axios.get(`${process.env.REACT_APP_API_SERVER_URL}/api/questions/${questionId}`)
    .then(response => {
      const question = response.data;

      setTitle(question.title);
      setContent(question.content);
      setViews(question.views);
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
    navigate(`/questions/edit/${questionId}`, {
      state: { title, content },
    });
  } 

  const handleDeleteButtonClick = (e) => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios.delete(`${process.env.REACT_APP_API_SERVER_URL}/api/questions/${questionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      ).then((response) => {
        if (response.data.success) {
          alert('삭제되었습니다.');
          window.location.replace('/');
        }
      }).catch((error) => {
        console.error(error.response);

        if (error.response.data.error === "IsNotQuestionWriter") {
          alert('접근 권한이 없습니다.');
          window.location.replace('/');
        } else {
          alert('에러가 발생했습니다.');
        }
      });
    }
  }

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div className={styles["question-detail"]}>
      <div className={styles["question-detail-header"]}>
        <h2 className={styles["question-title"]}>Q. {title}</h2>
        <p className={styles["question-createdAt"]}>
          {new Date(createdAt).toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
        </p>
        <p className={styles["question-views"]}>
          <AiOutlineEye className={styles["question-views-icon"]}/>{views}
        </p>
        <p className={styles["question-writer"]}>{nickname}</p>
      </div>
      <div className={styles["question-detail-content"]}>
        <p className={styles["question-content"]}>{content}</p>
      </div>
      {isWriter 
        ?
        <div className={styles["question-detail-footer"]}>
          <button className={styles["edit-question-button"]} onClick={handleEditButtonClick}>
            <MdEdit />
          </button>
          <button className={styles["delete-question-button"]} onClick={handleDeleteButtonClick}>
            <MdDelete />
          </button>
          {bookmarks && <BookmarkButton bookmarks={bookmarks} questionId={questionId} />}
          <button className={styles["comment-button"]} onClick={() => setIsModalOpen(true)}>
            <FaCommentDots /> {comments.length}
          </button>
        </div>      
        :
        <div className={styles["question-detail-footer"]}>
          {bookmarks && <BookmarkButton bookmarks={bookmarks} questionId={questionId} />}
          <button className={styles["comment-button"]} onClick={() => setIsModalOpen(true)}>
            <FaCommentDots /> {comments.length}
          </button>
        </div>
      }
      {isModalOpen && <CommentModal setIsModalOpen={setIsModalOpen} questionId={questionId} />}
    </div>
  )
}

export default QuestionDetailPage;