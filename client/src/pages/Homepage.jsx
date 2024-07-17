import { useEffect, useState } from "react";
import handlePost from "../Api/HandlePosts";
import Post from "../components/homepage/post";
import "../styles/homepage.css";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await handlePost();

      if (result.error) {
        setError(result.error);
      } else {
        setPosts(result.posts);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="homepage">
      <div className="post-container">
        {posts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            content={post.content}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
}
