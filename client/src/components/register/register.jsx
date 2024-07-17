import { useNavigate, Form } from "react-router-dom";
import UseForm from "./UseForm";
import handleRegister from "../../Api/HandleRegister";

export default function Register() {
  const navigate = useNavigate();

  const { formValues, formErrors, handleChange, validateInputs } = UseForm({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        const response = await handleRegister(formValues);
        if (response.success) {
          navigate("/", { state: { user: formValues } });
        } else {
          console.error("Registration failed: ", response.error);
        }
      } catch (error) {
        console.error("An error occurred during registration: ", error);
      }
    }
  };

  return (
    <div className="component">
      <Form
        method="post"
        className="bodyform"
        id="form"
        onSubmit={handleSubmit}
      >
        <h1>Register</h1>
        <div className="form-group">
          <label className="input-control">
            <input
              className="input container"
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Firstname"
              value={formValues.firstname}
              onChange={handleChange}
              autoComplete="off"
            />
            {formErrors.firstname && (
              <div className="error">{formErrors.firstname}</div>
            )}
          </label>
          <label className="input-control">
            <input
              className="input container"
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Lastname"
              value={formValues.lastname}
              onChange={handleChange}
              autoComplete="off"
            />
            {formErrors.lastname && (
              <div className="error">{formErrors.lastname}</div>
            )}
          </label>
          <label className="input-control">
            <input
              className="input container"
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              autoComplete="off"
            />
            {formErrors.email && (
              <div className="error">{formErrors.email}</div>
            )}
          </label>
          <label className="input-control">
            <input
              className="input container"
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {formErrors.password && (
              <div className="error">{formErrors.password}</div>
            )}
          </label>
          <label className="input-control">
            <input
              className="input container"
              type="password"
              id="password2"
              placeholder="Confirm Password"
              name="password2"
              value={formValues.password2}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {formErrors.password2 && (
              <div className="error">{formErrors.password2}</div>
            )}
          </label>
        </div>
        <button className="button" id="signupbut" type="submit">
          Submit
        </button>
      </Form>
    </div>
  );
}
