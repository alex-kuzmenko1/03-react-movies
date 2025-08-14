import { useRef, FormEvent } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const query = (formData.get("query") as string).trim();

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    try {
      await onSubmit(query);
      formRef.current?.reset();
    } catch (error) {
      toast.error("Search failed. Please try again.");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Powered by TMDB
        </a>
        <form 
          ref={formRef}
          className={styles.form} 
          onSubmit={handleSubmit}
        >
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
            aria-label="Search movies"
          />
          <button 
            className={styles.button} 
            type="submit"
            aria-label="Submit search"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}