import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};
    if (!formState.firstName) validationErrors.firstName = 'First name is required!';
    if (!formState.lastName) validationErrors.lastName = 'Last name is required!';
    if (!formState.email) validationErrors.email = 'Email is required!';
    else if (!/\S+@\S+/.test(formState.email)) validationErrors.email = 'Email is invalid!';
    if (!formState.password) validationErrors.password = 'Password is required!';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // proceed with mutation if validation passes
      // here (line 30) is where an error occurs
      const mutationResponse = await addUser({
        variables: {
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          password: formState.password,
        },
      });

      const token = mutationResponse.data.addUser.token;
      Auth.login(token);  // Login the user after successful signup
    } catch (e) {
      console.error("Error during signup:", e);
    }

    console.log('SignUp form submitted', formState);
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="btn-container">
      <a href="/login">
        <button>Go to Login!</button>
      </a>
      </div>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            placeholder="First"
            name="firstName"
            type="text"
            id="firstName"
            value={formState.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            placeholder="Last"
            name="lastName"
            type="text"
            id="lastName"
            value={formState.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="pwd">Password: </label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            value={formState.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
