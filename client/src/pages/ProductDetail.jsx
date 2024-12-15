import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";

import Cart from "../components/Cart";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import TitleHeader from "../components/TitleHeader";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

// import spinner from '../assets/spinner.gif';

const ProductDetail = ({ spinner }) => {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});
  const { products, cart } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (products.length) {
      const product = products.find((product) => product._id === id);
      setCurrentProduct(product);
    } else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity, 10) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity, 10) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise("cart", "delete", { ...currentProduct });
  };

  return (
    <div className="pd">
      <TitleHeader></TitleHeader> <Nav></Nav>
      {currentProduct && cart ? (
        <div className="pd-content">
          <div className="pd-content-btn">
            <Link to="/">← Back to Products</Link>
          </div>

          <div className="pd-content-info">
            <h2>{currentProduct.name}</h2>
            <p>{currentProduct.description}</p>
          </div>
          <div className="pd-content-card">
            <div className="pd-content-card-header">
              <p className="pd-content-card-header-price"><strong>Price:</strong>${currentProduct.price}{" "}</p>
              <div className="pd-content-card-header-btns">
              <button onClick={addToCart}>Add to Cart</button>
              <button
                disabled={!cart.find((p) => p._id === currentProduct._id)}
                onClick={removeFromCart}
              >
                Remove from Cart
              </button>
              </div>
            </div>

            <img className="pd-content-card-img"
              src={`/images/${currentProduct.image}`}
              alt={currentProduct.name}
            />
          </div>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
      <Footer></Footer>
    </div>
  );
};

ProductDetail.propTypes = {
  spinner: PropTypes.string.isRequired,
};

export default ProductDetail;
