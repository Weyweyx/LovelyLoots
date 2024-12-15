import Header from "../components/Header";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="lp">
      <div className="lp-background"> 
        <img src="/hero_desktop.webp" alt="" />
      </div>
      <Header></Header>
      <div className="lp-cta"> 
        <h1>Welcome to Lovely Loots</h1>
        <p>At Lovely Loots, we understand the enjoyment of collecting antiques and
            finding amazing vintage items. Let us help you, with just a click of a category search, 
            you&apos;ll be shown vintage products that we are sure you will love! So get searching for that Lovely Loot!
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LandingPage;
