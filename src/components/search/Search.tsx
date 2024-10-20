import React, { useState, useEffect } from 'react';
import styles from './Search.module.css';

const Search = ({ search, setSearch } : { search: string, setSearch: Function }) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearch, setSearch]);

  return (
    <input
      type="text"
      value={debouncedSearch}
      placeholder='search...'
      className={styles['search']}
      onChange={(e) => setDebouncedSearch(e.target.value)}
    />
  );
};

export default Search;