import { Link } from 'react-router-dom';
import { pluralize } from '../utils/helpers';
import { useStoreContext } from '../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import PropTypes from 'prop-types';

const ProductInfo = ({ _id, image, name, price, quantity, description }) => {
  const [state, dispatch] = useStoreContext();

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { _id, name, image, price, quantity, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { _id, name, image, price, quantity, purchaseQuantity: 1 });
    }
  };

  return (
    <div className='pi'>
      <Link to={`/products/${_id}`}>
       {/*  <img alt={name} src={image} /> */}
        <p style= {{color: 'black'}}>{name}</p>
      </Link>
      <div className='pi-product'>
        <div className='pi-product-info'>
          {quantity} {pluralize('item', quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
};

// PropTypes validation

ProductInfo.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  description: PropTypes.string,
};

export default ProductInfo;
