import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../App.css';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import EmptyListAlarm from '../components/EmptyListAlarm';
import { useSearchParams, useLocation } from 'react-router-dom';

const BASE_URL = `http://localhost:3000`;

const MainPage = () => {
  const [questions, setQuestions] = useState([]); 
  const [page, setPage] = useState(0);

  const [isLoading, setisLoading] = useState(false);
  const obsRef = useRef(null);
  const preventRef = useRef(true);
  const endRef = useRef(false);
  
  const location = useLocation();
  const path = location.pathname;
  const search = location.search;
  
  const [previousPath, setPreviousPath] = useState(path);
  const [previousSearch, setPreviousSearch] = useState(search);
  
  const [searchParams, setSearchParams] = useSearchParams();

  const handleObserver = ((entries) => {
    const target = entries[0];

    if (!endRef.current && target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setPage(prev => prev + 1);
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.5 });

    if (obsRef.current) {
      observer.observe(obsRef.current);
    }

    return () => { observer.disconnect(); }
  }, []);

  useEffect(() => {
    if (path !== previousPath || search !== previousSearch) {
      setPage(1);
    }

    setPreviousPath(path);
    setPreviousSearch(search);
    
    getQuestions();
  }, [page, path, search]);

  const getQuestions = useCallback(async () => {
    const keyword = searchParams.get('search');
    const endpoint = keyword && keyword.length > 0 
      ? `/api/questions?search=${keyword}&page=${page}`
      : `/api/questions?page=${page}`;

    setisLoading(true);

    try {
      const response = await axios({
        method: 'GET', 
        url: `${BASE_URL}${endpoint}` 
      });

      if (response.data) {
        if (page > 1) {
          setQuestions(prev => [...prev, ...response.data]);
        } else {
          setQuestions(response.data);
        }

        preventRef.current = true;
      } else {
        if (page === 1) {
          setQuestions([]);
        }  

        endRef.current = true;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  });

  return (
    <>
      <SearchBar placeholder='검색어를 입력하세요...' purpose='questions' />

      {!isLoading && questions.length === 0 && <EmptyListAlarm />}

      {questions && questions.map(question => (
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

      {isLoading && <p className='spinner'>Loading...</p>}

      <div className='observer' ref={obsRef} style={{ width: '100%', height: "30px" }}></div>
    </>
  );
};

export default MainPage;
