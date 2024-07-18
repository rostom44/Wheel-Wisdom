// src/Api/HandleTag.js
const Api = import.meta.env.VITE_API_URL;

export const handlePostTag = async (tags) => {
  try {
    if (tags.length === 0 || tags.every((tag) => tag.name.trim() === "")) {
      return { success: true, result: [] };
    }
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

export const handleGetTag = async () => {
  try {
    const response = await fetch(`${Api}api/tag`, {
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
    console.error("Error fetching tags:", error.message);
    return { success: false, error: error.message };
  }
};
