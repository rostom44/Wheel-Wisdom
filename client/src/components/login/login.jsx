import { useState } from "react";
import { useNavigate, Form } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import handleLogin from "../../Api/HandleLogin";

export default function Login() {
  const { login } = useUserContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email");
      return;
    }
    setEmailError("");

    // Validate password
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    setPasswordError("");

    try {
      const response = await handleLogin({ email, password });
      if (response.success) {
        localStorage.setItem("userId", response.id);

        login({ id: response.id }); // Use the id from response
        navigate("/", { state: { user: email } });
      } else {
        console.error("Login failed: ", response.error);
      }
    } catch (error) {
      console.error("An error occurred during login: ", error);
    }
  };

  return (
    <div className="component container">
      <Form
        method="post"
        className="bodyform"
        id="form"
        onSubmit={handleSubmit}
      >
        <h1>Login</h1>
        <div className="form-group">
          <label className="input-control">
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            {emailError && <p className="error">{emailError}</p>}
          </label>
        </div>
        <div className="form-group">
          <label className="input-control">
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </label>
        </div>
        <p className="forget">
          <a href="/">
            <u>Forget password?</u>
          </a>
        </p>
        <button className="button" type="submit">
          Submit
        </button>
      </Form>

      <div className="line" />
      <p>Don't have an account?</p>
      <a href="/register" style={{ fontWeight: "bold" }}>
        <u>Register</u>
      </a>
    </div>
  );
}
