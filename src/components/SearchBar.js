import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

function SearchBar() {
  const [searchKeyword, setsearchKeyword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setsearchKeyword(e.target.value);
  }

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
    </>
  )
}

export default SearchBar;