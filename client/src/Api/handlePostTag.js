const Api = import.meta.env.VITE_API_URL;

const handlePostTag = async (tags) => {
  try {
    const response = await fetch(`${Api}api/tag/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Server responded with status ${response.status}: ${errorData.message || "Unknown error"}`
      );
    }

    const result = await response.json();
    return { success: true, result };
  } catch (error) {
    console.error("Error posting tags:", error.message);
    return { success: false, error: error.message };
  }
};

export default handlePostTag;
