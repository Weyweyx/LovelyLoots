import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
import spinner from "../assets/spinner.gif";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_USER);

  useEffect(() => {
    if (!Auth.loggedIn()) {
      window.location.assign("/login");
    }
  }, []);

  if (loading) {
    return <img src={spinner} alt="loading" />;
  }

  const user = data?.user || {};

  return (
    <div className="container my-1">
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
        <h3>You haven't placed any orders yet.</h3>
      )}
    </div>
  );
};

export default Profile;
