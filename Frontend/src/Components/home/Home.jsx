import React from "react";
import Header from "./header";
import Banner from "./banner";
import Trending from "./trending";
import BestSelling from "./bestSelling";
import Footer from "./footer";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Trending />
      <BestSelling />
      <Footer />
    </div>
  );
};
export default Home;
