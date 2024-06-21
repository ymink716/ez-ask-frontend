import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegFaceSmile } from "react-icons/fa6";
import QuestionCard from '../components/QuestionCard';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState();
  const [activeTab, setActiveTab] = useState('posts');
  const [bookmarks, setBookmarks] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_API_SERVER_URL}/api/users/profile`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      }
    ).then((response) => {
      setUser(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    if (activeTab === 'bookmarks') {
      axios.get(
        `${process.env.REACT_APP_API_SERVER_URL}/api/questions/bookmarks`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          }
        }
      ).then((response) => {
        setBookmarks(response.data);
      }).catch((error) => {
        console.error(error);
      });
    } else if (activeTab === 'posts') {
      axios.get(
        `${process.env.REACT_APP_API_SERVER_URL}/api/questions/user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          }
        }
      ).then((response) => {
        setPosts(response.data);
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [activeTab]);

  const renderTabContent = () => {
    if (activeTab === 'bookmarks') {
      return (
        <div>
          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark, index) => {
              return <QuestionCard question={bookmark} key={bookmark.id} />;
            })
          ) : (
            <p>북마크가 없습니다.</p>
          )}
        </div>
      );
    } else if (activeTab === 'posts') {
      return (
        <div>
          {posts.length > 0 ? (
            posts.map((post, index) => {
              return <QuestionCard question={post} key={post.id} />;
            })
          ) : (
            <p>작성글이 없습니다.</p>
          )}
        </div>
      );
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <p><FaRegFaceSmile /></p>
        {user && <h4>{user.profile.nickname}</h4>}
      </div>

      <div className="profile-tabs">
        <button 
          className={activeTab === 'posts' ? 'active' : ''}
          onClick={() => setActiveTab('posts')}
        >
          작성글
        </button>
        <button 
          className={activeTab === 'bookmarks' ? 'active' : ''}
          onClick={() => setActiveTab('bookmarks')}
        >
          북마크
        </button>
      </div>

      <div className="profile-content">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default ProfilePage;
