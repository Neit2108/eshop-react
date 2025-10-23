// src/pages/home/components/RecommendedProducts.tsx

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from './ProductCard';
import {
  mockRecommendedProducts,
  mockTrendingProducts,
} from '@/pages/home/mockData';

type TabValue = 'recommended' | 'trending' | 'new';

const RecommendedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabValue>('recommended');

  const handleAddToCart = (productId: string) => {
    console.log('Added to cart:', productId);
  };

  const getProductsByTab = (tab: TabValue) => {
    switch (tab) {
      case 'recommended':
        return mockRecommendedProducts;
      case 'trending':
        return mockTrendingProducts;
      case 'new':
        return mockRecommendedProducts.slice(0, 4);
      default:
        return mockRecommendedProducts;
    }
  };

  const currentProducts = getProductsByTab(activeTab);

  return (
    <section className="py-6 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
            Gợi ý cho bạn
          </h2>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as TabValue)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="recommended" className="text-xs sm:text-sm">
                Dành cho bạn
              </TabsTrigger>
              <TabsTrigger value="trending" className="text-xs sm:text-sm">
                Xu hướng
              </TabsTrigger>
              <TabsTrigger value="new" className="text-xs sm:text-sm">
                Sản phẩm mới
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="recommended" className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending" className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <button className="px-6 sm:px-8 py-2 sm:py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base">
            Xem thêm
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;