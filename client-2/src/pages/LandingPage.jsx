import ProductList from "../components/ProductList";
import CategoryNav from "../components/CategoryNav";
import Cart from "../components/Cart";

const LandingPage = () => {
  return (
    <div className="container">
      <h1>Welcome to Lovely Loot!</h1>
        <p>At Lovely Loot, we understand the enjoyment of collecting antiques and
            finding amazing vintage items. Let us help you, with just a click of a category search, 
            you'll be shown antiques that will blow your mind! So get searching for that Lovely Loot!
        </p>
      <div className="btn-container">
        <a href="/signup">
          <button>Sign Up!</button>
        </a>
        <a href="/login">
          <button>Login!</button>
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
