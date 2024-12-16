import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {

  // State to handle form inputs

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State to handle form submission feedback

  const [submissionStatus, setSubmissionStatus] = useState("");

  // Handle form input changes

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle form submission

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form submission
    
    setSubmissionStatus("Your message has been sent. We'll get back to you soon!");
    setFormState({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <main>
      <Header></Header>
      <div className="container my-1">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="Your message"
              required
            />
          </div>
          <div className="flex-row flex-end">
            <button type="submit">Submit</button>
          </div>
        </form>
        {submissionStatus && <p className="submission-status">{submissionStatus}</p>}
      </div>
      <Footer></Footer>
    </main>
  );
};

export default Contact;
