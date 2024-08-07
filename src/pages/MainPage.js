import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../App.css';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import EmptyListAlarm from '../components/EmptyListAlarm';
import { useSearchParams, useLocation } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import LoadingAlarm from '../components/LoadingAlarm';

axios.defaults.baseURL = process.env.REACT_APP_API_SERVER_URL;

const MainPage = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1); 

  const [isLoading, setIsLoading] = useState(false);
  const obsRef = useRef(null);
  const preventRef = useRef(true);
  const endRef = useRef(false);

  const location = useLocation();
  const path = location.pathname;
  const search = location.search;

  const [previousPath, setPreviousPath] = useState(path);
  const [previousSearch, setPreviousSearch] = useState(search);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleObserver = (entries) => {
    const target = entries[0];

    if (!endRef.current && target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.5 });

    if (obsRef.current) {
      observer.observe(obsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (path !== previousPath || search !== previousSearch) {
      setPage(1); 
      setQuestions([]);
    }

    setPreviousPath(path);
    setPreviousSearch(search);

    getQuestions();
  }, [page, path, search]);

  const getQuestions = useCallback(async () => {
    const keyword = searchParams.get('search');
    const sortOrder = searchParams.get('sort');

    let endpoint;    
    if (keyword && keyword.length > 1 && sortOrder) {
      endpoint = `/api/questions?search=${decodeURI(keyword)}&page=${page}&sort=${decodeURI(sortOrder)}`;
    } else if (!keyword && sortOrder) {
      endpoint = `/api/questions?page=${page}&sort=${decodeURI(sortOrder)}`
    } else if (keyword && !sortOrder) {
      endpoint = `/api/questions?search=${decodeURI(keyword)}&page=${page}}`;
    } else {
      endpoint = `/api/questions?page=${page}`;
    }

    setIsLoading(true);

    try {
      // const response = await axios({
      //   method: 'GET',
      //   url: `${process.env.REACT_APP_API_SERVER_URL}${endpoint}`,
      // });
      // const response = await axios.get(endpoint);
      const response = await axios.get(`https://api.ez-ask.net${endpoint}`)
      console.log(response);
      if (response.data) {
        if (page > 1) {
          setQuestions((prev) => [...prev, ...response.data]);
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
      setIsLoading(false);
    }
  }, [page, searchParams]);

  const renderQuestions = questions.map((question, index) => {
    return <QuestionCard question={question} key={question.id} />;
  });

  return (
    <>
      <SearchBar placeholder='검색어를 입력하세요...' purpose='questions' />

      {!isLoading && questions.length === 0 && search && <EmptyListAlarm />}

      {questions && renderQuestions}

      {isLoading && <LoadingAlarm />}

      <div className='observer' ref={obsRef} style={{ width: '100%', height: '30px' }}></div>
    </>
  );
};

export default MainPage;
