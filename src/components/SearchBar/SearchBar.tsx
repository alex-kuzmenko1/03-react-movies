import { toast } from "react-hot-toast";
import { useState } from "react";
import css from "./SearchBar.module.css";

export interface SearchBarProps {
  action: (formData: FormData) => void;
}

export default function SearchBar({ action }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleAction = (formData: FormData) => {
    const value = (formData.get("query") as string).trim();

    if (!value) {
      toast.error("Please enter a search term.");
      return;
    }

    action(formData);
  };

  return (
    <header className={css.header}>
      <form className={css.form} action={handleAction}>
        <input
          className={css.input}
          type="text"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          placeholder="Search movies..."
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
