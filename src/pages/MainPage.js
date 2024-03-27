import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Question from '../components/Question';

const MainPage = () => {
  const [questions, setQuestions] = useState([]); 

  const fetchQuestions = () => {
    axios.get(`http://localhost:3000/api/questions`)
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
      <h1>질문 글 목록</h1>
      <ul>
        {questions.map(question => (
          <Question question={question} key={question.id} />
        ))}
      </ul>
    </>
  );
};

export default MainPage;
