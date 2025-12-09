import FeaturedProducts from "@/components/features/new-home/FeaturedProducts";
import FlashSale from "@/components/features/new-home/FlashSale";
import HeroSlider from "@/components/features/new-home/HeroSlider";
import Newsletter from "@/components/features/new-home/Newsletter";
import ProductCategories from "@/components/features/new-home/ProductCategories";
import Testimonials from "@/components/features/new-home/Testimonials";
import TopRatedShops from "@/components/features/new-home/TopRatedShops";
import Footer from "@/components/layout/Footer";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSlider />
      <FeaturedProducts />
      <TopRatedShops />
      <ProductCategories />
      <FlashSale />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
};

export default HomePage;
