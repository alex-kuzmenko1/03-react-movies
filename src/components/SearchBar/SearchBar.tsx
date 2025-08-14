import { toast } from 'react-hot-toast';
import { SearchBarProps } from '../../types/searchBar';
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }: SearchBarProps) {
  async function handleSearch(formData: FormData) {
    const query = (formData.get('query') as string)?.trim();
    if (!query) {
      toast.error('Please enter a search term');
      return;
    }
    onSubmit(query);
  }

  return (
    <form action={handleSearch} className={css.form}>
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
