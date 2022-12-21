import styles from './news-page.module.css';

/* eslint-disable-next-line */
export interface NewsPageProps {}

export function NewsPage(props: NewsPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to NewsPage!</h1>
    </div>
  );
}

export default NewsPage;
