import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import { ADD_PRODUCT, DELETE_PRODUCT } from "../utils/mutations";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
/* import TitleHeader from "../components/TitleHeader";
import Footer from "../components/Footer";
import Nav from "../components/Nav";   don't know if we'll need this page at all -maybe future development*/

const SellerDashboard = () => {

  // Access the global state and products from the store

  const [state, dispatch] = useStoreContext();
  const { products } = state;

  // GraphQL query to fetch all products

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // GraphQL mutations for adding and deleting products

  const [addProduct] = useMutation(ADD_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  // Effect to handle product data from the backend or IndexedDB

  useEffect(() => {
    if (data) {

      // Update the global state with the fetched products

      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      // Save the fetched products to IndexedDB

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {

      // Load products from IndexedDB if the backend data isn't available

      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [data, loading, dispatch]);

  // Function to handle adding a new product

  const handleAddProduct = async () => {
    try {
      const newProduct = {
        name: "New Product",
        description: "Description of the product",
        price: 0,
        stock: 0,
        category: "others",
        image: "default-image.png",
      };

      // Call the `ADD_PRODUCT` mutation

      const { data } = await addProduct({ variables: newProduct });

      // Update the global state with the new product

      dispatch({
        type: UPDATE_PRODUCTS,
        products: [...products, data.addProduct],
      });

      // Save the new product to IndexedDB

      idbPromise("products", "put", data.addProduct);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Function to handle deleting a product

  const handleDeleteProduct = async (productId) => {
    try {

      // Call the `DELETE_PRODUCT` mutation

      await deleteProduct({ variables: { id: productId } });

      // Remove the product from the global state

      const updatedProducts = products.filter((product) => product._id !== productId);
      dispatch({
        type: UPDATE_PRODUCTS,
        products: updatedProducts,
      });

      // Remove the product from IndexedDB

      idbPromise("products", "delete", { _id: productId });
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <main>
      <div className="container my-1">
        <h2>Seller Dashboard</h2>

        {/* Button to add a new product */}
        <button onClick={handleAddProduct}>Add New Product</button>

        <div className="product-list">
          {products.length ? (

            // Map over the products and display them

            products.map((product) => (
              <div key={product._id} className="product-item">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stock}</p>

                {/* Button to delete a product */}
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </div>
            ))
          ) : (

            // Display a message if no products are available
            
            <h3>No products available</h3>
          )}
        </div>
      </div>
    </main>
  );
};

export default SellerDashboard;
