import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { handleGetTag } from "../../Api/HandleTag";

export default function Post({ title, content, image }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await handleGetTag();
        if (response.success) {
          const selectedTags = response.tags
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
          setTags(selectedTags);
        } else {
          console.error("Error fetching tags:", response.error);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="component post">
      <h2>{title}</h2>
      <div className="tag-group">
        {tags.map((tag) => (
          <p key={tag.id} className="tag">
            {tag.name}
          </p>
        ))}
      </div>
      <p>{content}</p>
      {image && <img src={image} alt={title} className="post-img" />}
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  image: PropTypes.string,
};
