import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../components/TitleHeader";
import Footer from "../components/Footer";

function Signup() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [addUser] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};
    if (!formState.firstName)
      validationErrors.firstName = "First name is required!";
    if (!formState.lastName)
      validationErrors.lastName = "Last name is required!";
    if (!formState.email) validationErrors.email = "Email is required!";
    else if (!/\S+@\S+/.test(formState.email))
      validationErrors.email = "Email is invalid!";
    if (!formState.password)
      validationErrors.password = "Password is required!";
    else if (formState.password.length < 6)
      validationErrors.password = "Password must be at least six characters!";

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
      Auth.login(token); // Login the user after successful signup
      navigate("/productsearch");
    } catch (e) {
      //console.error("Error during signup:", e);
      setErrors({
        general: "An error occurred during signup. Please try again!",
      });
    }

    console.log("SignUp form submitted", formState);
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
      <TitleHeader></TitleHeader>
      <div className="su-background">
        <div className="su-background-l"><img src="/hero__arch.webp" alt="" /></div>
        <div className="su-background-r">
          <img src="/right_1728.webp" alt="" />
        </div>
      </div>
      <div className="su-title">
        <h2></h2>
      </div>
      <form className="su-form" onSubmit={handleFormSubmit}>
        <h2 className="su-form-title">Sign Up</h2>
        <div className="su-form-row">
          <label htmlFor="firstName">First Name: </label>
          <input className="su-form-row-input"
            placeholder="first name"
            name="firstName"
            type="text"
            id="firstName"
            value={formState.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>
        <div className="su-form-row">
          <label htmlFor="lastName">Last Name: </label>
          <input className="su-form-row-input"
            placeholder="last name"
            name="lastName"
            type="text"
            id="lastName"
            value={formState.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>
        <div className="su-form-row">
          <label htmlFor="email">Email: </label>
          <input className="su-form-row-input"
            placeholder="youremail@example.com"
            name="email"
            type="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="su-form-row">
          <label htmlFor="pwd">Password: </label>
          <input className="su-form-row-input"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            value={formState.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <br></br>
        <div className="su-form-btn">
          <button type="submit">Submit</button>
          <Link to="/login">
            <button>Go to Login</button>
          </Link>
        </div>
        {/* <div className="su-btn">
        <Link to="/login">
          <button type="button">Go to Login</button>
        </Link>
      </div> */}
      </form>
      <Footer></Footer>
    </div>
  );
}

export default Signup;
