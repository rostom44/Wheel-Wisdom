import { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { WithContext as ReactTags } from "react-tag-input";
import { handleGetTag, handlePostTag } from "../../Api/HandleTag";
import { useUserContext } from "../../context/userContext";
import handlePostAdd from "../../Api/HandlePostAdd";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function PostAdd() {
  const { user } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await handleGetTag();
        if (response.success) {
          const newTags = response.tags.map((tag) => ({
            id: tag.id.toString(),
            text: tag.name,
          }));
          setAvailableTags(newTags);
        } else {
          console.error("Error fetching tags:", response.error);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const onSubmit = async (data) => {
    const tagsToPost = tags
      .filter((tag) => tag.text)
      .map((tag) => ({ name: tag.text }));

    try {
      const postTagResponse = await handlePostTag(tagsToPost);
      if (postTagResponse.success) {
        const postData = {
          title: data.title,
          publish_date: new Date().toISOString().slice(0, 19).replace("T", " "),
          content: data.content,
          image: data.image,
          user_id: user?.id,
        };

        const postAddResponse = await handlePostAdd(postData);
        if (postAddResponse.success) {
          window.location.href = "/";
        } else {
          console.error("Error adding post:", postAddResponse.error);
        }
      } else {
        console.error("Error posting tags:", postTagResponse.error);
      }
    } catch (error) {
      console.error("Error posting tags:", error);
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit(onSubmit)} method="post">
        <div className="title-label">
          <input
            type="text"
            name="title"
            placeholder="Title"
            aria-label="title"
            className="title-input"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <div className="error">{errors.title.message}</div>}
        </div>

        <div className="tags-label">
          <ReactTags
            tags={tags}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            delimiters={delimiters}
            inputFieldPosition="bottom"
            autocomplete
            suggestions={availableTags}
          />
          {errors.tags && <div className="error">{errors.tags.message}</div>}
        </div>

        <textarea
          name="content"
          className="content-textarea"
          placeholder="Content"
          {...register("content", { required: "Content is required" })}
        />
        {errors.content && (
          <div className="error">{errors.content.message}</div>
        )}

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          {...register("image")}
        />

        <button type="submit" className="button">
          Publish
        </button>
      </Form>
    </div>
  );
}
