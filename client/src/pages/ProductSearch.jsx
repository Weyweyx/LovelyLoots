import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES, QUERY_PRODUCTS } from "../utils/queries";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CATEGORIES, UPDATE_PRODUCTS } from "../utils/actions";
import ProductItem from "../components/ProductInfo";
import { idbPromise } from "../utils/helpers";
import CategoryNav from "../components/CategoryNav";
import TitleHeader from "../components/TitleHeader";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const ProductSearch = () => {
  const [state, dispatch] = useStoreContext();

  const { categories, currentCategory, products } = state;

  const { loading: categoryLoading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  const { loading: productLoading, data: productData } = useQuery(QUERY_PRODUCTS, {
    variables: { category: currentCategory },
  });

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!categoryLoading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories,
        });
      });
    }
  }, [categoryData, categoryLoading, dispatch]);

  useEffect(() => {
    if (productData) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: productData.products,
      });
      productData.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!productLoading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products,
        });
      });
    }
  }, [productData, productLoading, dispatch]);

  const filteredProducts = products.filter((product) =>
    currentCategory ? product.category._id === currentCategory : true
  );

  return (
    <main>
    <TitleHeader></TitleHeader> <Nav></Nav>
      <div className="ps">
        <h2>Our Products</h2>
      </div>
      <div className="container">
        <br></br>
        <CategoryNav></CategoryNav> {/* make sure this looks right after being able to login is fixed */}
        <h2>Our Products!</h2>
        {filteredProducts.length ? (
          <div className="ps-list">
            {filteredProducts.map((product) => (
              <ProductItem key={product._id} {...product} />
            ))}
          </div>
        ) : (
          <h3>Sorry, no loot found in this category!</h3> /* code this so if no products are found this is shown */
        )}
      </div>
      <Footer></Footer>
    </main>
  );
};

export default ProductSearch;
