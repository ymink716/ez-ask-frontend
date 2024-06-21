import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import './SearchBar.css';

function SearchBar(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    
    if (search) {
      setSearchKeyword(search);
    } else {
      setSearchKeyword('');
    }

    if (sort) {
      setSortOrder(sort);
    } else {
      setSortOrder(undefined);
    }
  }, [searchParams]);
  
  const onChangeHandler = (e) => {
    setSearchKeyword(e.target.value);
  }

  const onSortChangeHandler = (e) => {
    setSortOrder(e.target.value);
  }

  const handleKeywordSubmit = (event) => {
    event.preventDefault();
    
    const order = sortOrder ? sortOrder : 'LATEST';
    
    if (searchKeyword && searchKeyword.length > 1) {
      navigate(`/questions?search=${searchKeyword}&sort=${order}`);
    } else if (!searchKeyword && sortOrder) {
      navigate(`/questions?sort=${order}`);
    } else if (searchKeyword && !sortOrder) {
      navigate(`/questions?search=${searchKeyword}`);
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
        <select 
          className="search-sort" 
          value={sortOrder || 'DEFAULT'} 
          onChange={onSortChangeHandler}
        >
          <option value="DEFAULT" disabled>-------</option>
          <option value="LATEST">최신순</option>
          <option value="VIEWS">조회순</option>
        </select>
        <button className="search-button" type="submit">
          <BsSearch />
        </button>
      </form>
      <hr/>
    </div>
  );
}

export default SearchBar;
