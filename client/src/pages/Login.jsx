import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="su">
      <div className="su-background">
        <img src="/hero__arch.webp" alt="" />

      </div>
      <h2>Login</h2>
      <form className= "su-form" onSubmit={handleFormSubmit}>
        <div className= "su-form-row">
          <label htmlFor="email">Email: </label>
          <input
            placeholder=""
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="su-form-row">
          <label htmlFor="pwd">Password: </label>
          <input
            placeholder=""
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p>The provided credentials are invalid</p>
          </div>
        ) : null}
        <br></br>
        <div className="su-form-btn">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="su-btn">
        <Link to="/signup">
          <button>Go to Signup</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
