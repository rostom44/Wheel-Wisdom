const Api = import.meta.env.VITE_API_URL;

const handlePostsByTag = async (tagId) => {
  try {
    const response = await fetch(`${Api}api/tags/${tagId}/post`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return { posts: data };
  } catch (error) {
    return { error: error.message };
  }
};

export default handlePostsByTag;
