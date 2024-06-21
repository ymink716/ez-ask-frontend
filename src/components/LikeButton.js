import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LikeButton.css'
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";

function LikeButton({likes, commentId}) {
  const [liked, setLiked] = useState(false);
  const [login, setLogin] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const token = localStorage.getItem('access_token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    setLikeCount(likes.length);
    if (userId) {
      setLogin(true);

      likes.forEach(like => {
        if (like.user.id == userId) {
          setLiked(true);
        }
      });
    } 
  }, []);

  const handleLike = () => {
    if (!liked) {
      axios.post(
        `${process.env.REACT_APP_API_SERVER_URL}/api/likes/comments/${commentId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        if (response.data.success) {
          setLiked(true);
          setLikeCount(likeCount + 1)
        }
      }).catch((error) => {
        console.error(error);
        if (error.response.data.error === "CommentAlreadyLiked") {
          alert('이미 좋아요를 누른 답변입니다.');
        } else {
          alert('에러가 발생했습니다.');
        }
      })
    } else {
      axios.delete(`${process.env.REACT_APP_API_SERVER_URL}/api/likes/comments/${commentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        if (response.data.success) {
          setLiked(false);
          setLikeCount(likeCount - 1);
        }
      }).catch((error) => {
        console.error(error.response);
        alert('에러가 발생했습니다.');
      });
    }
  }

  return (
  <button className="like-button" onClick={handleLike} disabled={!login} >
    {liked ? <AiFillLike /> : <AiOutlineLike />} {likeCount}
  </button>
    
  )
}

export default LikeButton;