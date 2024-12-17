import { useEffect } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from "../utils/actions";
import { QUERY_CATEGORIES } from "../utils/queries";
import { idbPromise } from "../utils/helpers";

function CategoryNav() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data } = useQuery(QUERY_CATEGORIES);
  const client = useApolloClient();
  useEffect(() => {
    client.cache.reset();
    if (data) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: data.categories,
      });
      data.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [data, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  console.log({ categories });
  return (
    <div>
      <h2>Choose a Category!</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
      <button
        onClick={() => {
          handleClick("");
        }}
      >
        All
      </button>
    </div>
  );
}

export default CategoryNav;
