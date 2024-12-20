import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import CartItem from "./CartItem";
import Auth from "../utils/auth";
import { useStoreContext } from "../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../utils/actions";
import PropTypes from "prop-types";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
    console.log(state.cart)
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    getCheckout({
      variables: {
        products: [...state.cart],
      },
    });
  }

  // if (!cartOpen) {
  //   return (
  //     <div className="cart-closed" onClick={toggleCart}>
  //       <span role="img" aria-label="trash">
  //         🛒
  //       </span>
  //     </div>
  //   );
  // }

  return (
    <div className="cart">
      <div onClick={toggleCart}>[close]</div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div className="cart-items">
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="cart-total">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button className="cart-total-sub" onClick={submitCheckout}>
                Checkout
              </button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <div className="cart-empty">
          <h3>You haven&apos;t found any loot yet!</h3>
        </div>
      )}
    </div>
  );
};

// PropTypes validation

Cart.propTypes = {
  cartOpen: PropTypes.bool.isRequired,
};

export default Cart;
