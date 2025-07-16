import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedProducts from '../components/FeaturedProducts';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
    </>
  );
};

export default Home;