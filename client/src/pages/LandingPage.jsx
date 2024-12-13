import ProductList from "../components/ProductList";
import CategoryNav from "../components/CategoryNav";
import Cart from "../components/Cart";
import Header from "../components/Header";

const LandingPage = () => {
  return (
    <div className="lp">
      <div className="lp-background"> 
        <img src="/hero_desktop.webp" alt="" />
      </div>
      <Header></Header>
      <div className="lp-cta"> 
        <h1>Welcome to Lovely Loot</h1>
        <p>At Lovely Loot, we understand the enjoyment of collecting antiques and
            finding amazing vintage items. Let us help you, with just a click of a category search, 
            you&apos;ll be shown antiques that will blow your mind! So get searching for that Lovely Loot!
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
