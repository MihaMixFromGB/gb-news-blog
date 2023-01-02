import { FullNews } from './FullNews';
import { CommentsList } from './CommentsList';

export function NewsDetails() {
  return (
    <div className="container mx-auto my-5">
      <FullNews />
      <CommentsList />
    </div>
  );
}

export default NewsDetails;
