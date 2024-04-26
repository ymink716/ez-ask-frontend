import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

const BASE_URL = `http://localhost:3000`;

const MainPage = () => {
  const [questions, setQuestions] = useState([]); 
  const [searchWord, setSearchWord] = useState('');

  
  const fetchQuestions = () => {
    axios.get(`${BASE_URL}/api/questions`)
    .then(response => {
      setQuestions(response.data);
    })
    .catch(error => {
      console.error(error);
    })
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchWord.length < 2 || searchWord.length > 10) {
      alert(`검색어는 2글자 이상 10글자 이하여야 합니다.`);
      return;
    }
    
    axios.get(`http://localhost:3000/api/questions?search=${searchWord}`)
    .then(response => {
      setQuestions(response.data);
    })
    .catch(error => {
      console.error(error);
    })
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="검색어를 입력하세요..."
            minLength={2}
            maxLength={10}
          />
          <button type="submit">검색</button>
        </form>
      </div>
      
      <ul>
        {questions.map(question => (
          <div className='question-card' key={question.id}>
            <h3>Q. {question.title}</h3>
            <div className='question-info'>
              <p className='date'>{new Date(question.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <div className='counts'>
                <p>좋아요 {question.likes}</p>
                <p>북마크 {question.bookmarks}</p>
                <p>댓글 {question.comments}</p>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
};

export default MainPage;
