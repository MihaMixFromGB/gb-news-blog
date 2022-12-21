import styles from './full-news.module.css';

/* eslint-disable-next-line */
export interface FullNewsProps {}

export function FullNews(props: FullNewsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FullNews!</h1>
    </div>
  );
}

export default FullNews;
