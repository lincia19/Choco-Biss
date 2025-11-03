import React from 'react';
import Hero from "../components/Hero";
import BestSeller from "../components/BestSeller";
import LatestCollection from "../components/LatestCollection";
import NewsletterBox from "../components/NewsletterBox";

const Home = () => {
  return (
    <div>
      <Hero />
      <BestSeller />
      <LatestCollection />
      <NewsletterBox />
    </div>
  );
};

export default Home;
