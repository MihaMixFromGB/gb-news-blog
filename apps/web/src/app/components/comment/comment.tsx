import styles from './comment.module.css';

/* eslint-disable-next-line */
export interface CommentProps {}

export function Comment(props: CommentProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Comment!</h1>
    </div>
  );
}

export default Comment;
