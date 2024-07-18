const Api = import.meta.env.VITE_API_URL;

if (!Api) {
  console.warn("VITE_API_URL is not set in environment variables");
}

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
      // credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, user: data };
    }
    return { success: false, error: data.error };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default handleLogin;
