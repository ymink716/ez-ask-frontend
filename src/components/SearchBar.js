import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import './SearchBar.css';

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
    <div className="searchbar">
      <form className="search-form" onSubmit={handleKeywordSubmit}>
        <input
          className="search-input"
          type="text"
          value={searchKeyword}
          onChange={onChangeHandler}
          placeholder={props.placeholder}
          minLength={1}
          maxLength={10}
          
        />
        <button className="search-button" type="submit">
          <BsSearch />
        </button>
      </form>
      <hr/>
    </div>
  )
}

export default SearchBar;