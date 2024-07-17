import PropTypes from "prop-types";

export default function Post({ title, content, image }) {
  return (
    <div className="component post">
      <h2>{title}</h2>
      <p>{/* Placeholder for tagPlace */}</p>
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
