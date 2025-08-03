import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <div className={css.container}>
    <h1>404 - Page not found</h1>
    <Link to="/">Go to Home</Link>
  </div>
);