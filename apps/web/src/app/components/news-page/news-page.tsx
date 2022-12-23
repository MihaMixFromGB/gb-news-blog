import { FullNews } from '../full-news/full-news';
import { CommentsList } from '../comments-list/comments-list';

export function NewsPage() {
  return (
    <div>
      <FullNews />
      <CommentsList />
    </div>
  );
}

export default NewsPage;
