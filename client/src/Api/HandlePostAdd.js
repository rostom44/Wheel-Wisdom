const Api = import.meta.env.VITE_API_URL;

const handlePostAdd = async (formValues) => {
  try {
    const response = await fetch(`${Api}api/post/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
      credentials: "include",
    });

    if (response.status !== 201) {
      const data = await response.json();
      return { error: data.message };
    }
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};

export default handlePostAdd;
