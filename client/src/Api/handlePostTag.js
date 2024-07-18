const Api = import.meta.env.VITE_API_URL;

const handleTag = async () => {
  try {
    const response = await fetch(`${Api}api/tag/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const tags = await response.json();
    return { success: true, tags };
  } catch (error) {
    return { error: error.message };
  }
};

export default handleTag;
