import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

function SearchBar(props) {
  const [searchKeyword, setSearchKeyword] = useState('');

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setSearchKeyword(e.target.value);
  }

  const handleKeywordSubmit = (event) => {
    event.preventDefault();
    
    if (searchKeyword) {
      navigate(`/questions?search=${searchKeyword}`)
    } else {
      window.location.replace('/');
    }
  };

  return (
    <div>
      <form onSubmit={handleKeywordSubmit}>
        <input
          type="text"
          value={searchKeyword}
          onChange={onChangeHandler}
          placeholder={props.placeholder}
          minLength={1}
          maxLength={10}
          
        />
        <button type="submit">
          <BsSearch />
        </button>
      </form>
    </div>
  )
}

export default SearchBar;