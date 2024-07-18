import Post from "../components/post/postAdd";
import "../styles/post.css";

export default function PostPage() {
  return (
    <div className="homepage">
      <h1 style={{ color: "white", margin: "1rem" }}>Create a post</h1>
      <Post />
    </div>
  );
}
