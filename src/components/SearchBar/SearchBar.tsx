import React from 'react';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleAction = async (formData: FormData) => {
    const query = (formData.get('query') as string).trim();

    if (!query) {
      toast.error('Please enter a search term');
      return;
    }

    onSubmit(query);
  };

  return (
    <form action={handleAction} className={css.form}>
      <input
        type="text"
        name="query"
        placeholder="Search movies..."
        className={css.input}
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
}
