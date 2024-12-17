import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
import spinner from "../assets/images/spinner.gif";
import TitleHeader from "../components/TitleHeader";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const Profile = () => {
  // Fetch user data using GraphQL query
  const { loading, data, error } = useQuery(QUERY_USER);

  // Redirect unauthenticated users to the login page
  useEffect(() => {
    if (!Auth.loggedIn()) {
      window.location.assign("/login");
    }
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <div>
        <img src={spinner} alt="loading" />
        <p>Loading your profile...</p>
      </div>
    );
  }

  // Handle errors from the GraphQL query
  if (error) {
    console.error("Error fetching user data:", error.message);
    return (
      <div>
        <h2>Error</h2>
        <p>There was an issue fetching your profile data. Please try again later.</p>
      </div>
    );
  }

  // Destructure user data
  const user = data?.user || {};

  return (
    <div>
      <TitleHeader /> 
      <Nav />
      <h2>Your Profile</h2>
      <div>
        <p>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <h3>Your Orders</h3>
      {user.orders && user.orders.length ? (
        <div>
          {user.orders.map((order) => (
            <div key={order._id} className="order">
              <h4>Order ID: {order._id}</h4>
              <p>Purchase Date: {new Date(order.purchaseDate).toLocaleDateString()}</p>
              <div>
                {order.products.map((product) => (
                  <div key={product._id}>
                    <p>
                      {product.name} - ${product.price} x {product.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h3>You haven&apos;t placed any orders yet!</h3>
      )}
      <Footer />
    </div>
  );
};

export default Profile;
