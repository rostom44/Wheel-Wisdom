const Api = import.meta.env.VITE_API_URL;

const handlePost = async () => {
  try {
    const response = await fetch(`${Api}api/post/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const posts = await response.json();
    return { success: true, posts };
  } catch (error) {
    return { error: error.message };
  }
};

export default handlePost;
