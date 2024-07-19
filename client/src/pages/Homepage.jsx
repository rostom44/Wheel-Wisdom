import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuPlusCircle } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa";
import handlePost from "../Api/HandlePosts";
import handlePostsByTag from "../Api/HandlePostByTag";
import Post from "../components/homepage/post";
import "../styles/homepage.css";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showScroll, setShowScroll] = useState(false);

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

  const handleSearch = async () => {
    if (searchTerm) {
      const result = await handlePostsByTag(searchTerm);
      if (result.error) {
        setError(result.error);
      } else {
        setPosts(result.posts);
      }
    } else {
      // Optionally, fetch all posts again or clear the posts list
    }
  };

  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > 400) {
      setShowScroll(true);
    } else if (showScroll && window.scrollY <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showScroll]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="homepage">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by tag"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} type="button">
          Search
        </button>
      </div>
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
      <Link to="/post" className="button post-button">
        <button className="button post-button" type="button">
          <LuPlusCircle className="post-icon" />
          POST
        </button>
      </Link>
      {showScroll && (
        <button
          className="scroll-top-button"
          onClick={scrollTop}
          type="button"
          aria-label="top page button"
        >
          <FaArrowUp className="scroll-top-icon" />
        </button>
      )}
    </div>
  );
}
