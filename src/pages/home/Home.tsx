import FeaturedCategories from '@/components/features/home/FeaturedCategories';
import FeaturedVendors from '@/components/features/home/FeaturedVendors';
import FlashSaleSection from '@/components/features/home/FlashSaleSection';
import HeroSection from '@/components/features/home/HeroSection';
import RecommendedProducts from '@/components/features/home/RecommendedProducts';
import React from 'react';

/**
 * Home Page Component
 *
 * Structure:
 * - Header: Navigation bar with search, categories menu, cart, and account
 * - HeroSection: Carousel banner with promotional content
 * - FeaturedCategories: Grid of popular product categories
 * - FlashSaleSection: Time-limited deals with countdown timer
 * - RecommendedProducts: Tabbed product recommendations (For you, Trending, New)
 * - FeaturedVendors: Showcase of popular brands and sellers
 * - Footer: Footer with company info, links, and contact
 *
 * Design Approach:
 * - Mobile-first responsive design
 * - Tailwind CSS for styling
 * - Shadcn UI components integration
 * - Smooth transitions and hover effects
 * - Accessible markup and navigation
 */

const HomePage: React.FC = () => {
  return (
    <>
        {/* Hero Banner Section */}
        <HeroSection />

        {/* Featured Categories Section */}
        <FeaturedCategories />

        {/* Flash Sale Section with Countdown */}
        <FlashSaleSection />

        {/* Recommended Products Section with Tabs */}
        <RecommendedProducts />

        {/* Featured Vendors/Brands Section */}
        <FeaturedVendors />
      </>
  );
};

export default HomePage;