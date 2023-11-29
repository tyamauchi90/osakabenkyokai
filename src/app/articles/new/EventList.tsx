"use client";
import useBlogList from "../../circle/schedule/useBlogList";
import Loading from "../../loading";

function EventList() {
  const { posts, loading } = useBlogList();

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h1>記事一覧</h1>
      <ul>
        {posts
          .slice() // オリジナルの配列を変更しないためにコピーを作成
          .sort((a, b) => {
            const dateA = a.eventDate?.toDate()?.getTime() || 0;
            const dateB = b.eventDate?.toDate()?.getTime() || 0;
            return dateB - dateA; // 最新の日付順にソート
          })
          .map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>イベント日: {post.eventDate?.toDate().toLocaleDateString()}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default EventList;
