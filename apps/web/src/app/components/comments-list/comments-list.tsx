import styles from './comments-list.module.css';

/* eslint-disable-next-line */
export interface CommentsListProps {}

export function CommentsList(props: CommentsListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CommentsList!</h1>
    </div>
  );
}

export default CommentsList;
