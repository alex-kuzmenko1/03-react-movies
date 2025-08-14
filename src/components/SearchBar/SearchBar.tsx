import { useState } from 'react';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={css.searchForm}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className={css.searchInput}
      />
      <button type="submit" className={css.searchButton}>
        Search
      </button>
    </form>
  );
}