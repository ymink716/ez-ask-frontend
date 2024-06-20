import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdBookmark } from "react-icons/md";
import { MdBookmarkBorder } from "react-icons/md";
import './BookmarkButton.css';

function BookmarkButton({bookmarks, questionId}) {
  const [bookmarked, setBookmarked] = useState(false);
  const [login, setLogin] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  const token = localStorage.getItem('access_token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    setBookmarkCount(bookmarks.length);
    if (userId) {
      setLogin(true);

      bookmarks.forEach(bookmark => {
        if (bookmark.user.id == userId) {
          setBookmarked(true);
        }
      });
    } 
  }, []);

  const handleBookmark = () => {
    if (!bookmarked) {
      axios.post(
        `http://localhost:3000/api/bookmarks/questions/${questionId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        console.log(response);
        if (response.data.success) {
          setBookmarked(true);
          setBookmarkCount(bookmarkCount + 1)
        }
      }).catch((error) => {
        console.error(error);
        if (error.response.data.error === "QuestionAlreadyBookmarked") {
          alert('이미 북마크한 질문입니다.');
        } else {
          alert('에러가 발생했습니다.');
        }
      })
    } else {
      axios.delete(`http://localhost:3000/api/bookmarks/questions/${questionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        if (response.data.success) {
          setBookmarked(false);
          setBookmarkCount(bookmarkCount - 1);
        }
      }).catch((error) => {
        console.error(error.response);
        alert('에러가 발생했습니다.');
      });
    }
  };

  return (
    <button className="bookmark-button" onClick={handleBookmark} disabled={!login}>
      {bookmarked ? <MdBookmark /> : <MdBookmarkBorder />}  {bookmarkCount}
    </button>
  );
}

export default BookmarkButton;