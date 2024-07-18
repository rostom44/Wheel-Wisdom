const Api = import.meta.env.VITE_API_URL;

const handleLogin = async (formValues) => {
  const { email, password } = formValues;

  // Ensure email and password are not empty
  if (!email || !password) {
    return { success: false, error: "Email and password must be provided" };
  }

  try {
    const response = await fetch(`${Api}api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
      credentials: "include",
    });

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      return { success: false, error: text };
    }

    const data = await response.json();

    if (response.ok) {
      // Assuming 'id' is a field in the response data
      return { success: true, id: data.id }; // Ensure 'id' is being returned
    }
    return { success: false, error: data.error };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default handleLogin;
