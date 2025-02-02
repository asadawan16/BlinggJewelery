import { Link } from "react-router-dom";
import "./banner.css";
const Banner = () => {
  return (
    <div className="banner">
      <div className="container">
        <span className="subheading">New collection</span>
        <h1>The new ring sensation</h1>
        <p className="banner-description">
          "Elegance Redefined – Exquisite Jewelry for the Modern Woman. Shine
          with Timeless Beauty!"
        </p>
        <Link to="/products">Shop Now</Link>
      </div>
    </div>
  );
};
export default Banner;
