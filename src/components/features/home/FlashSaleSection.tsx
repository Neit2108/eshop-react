import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import CountdownTimer from './CountdownTimer';
import { mockFlashSaleProducts } from '@/pages/home/mockData';

const FlashSaleSection: React.FC = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleAddToCart = (productId: string) => {
    console.log('Added to cart:', productId);
  };

  const flashSaleEndTime = new Date(Date.now() + 6 * 60 * 60 * 1000);

  return (
    <section className="py-6 sm:py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
              🔥 DEAL SỐC HÔM NAY
            </h2>
            <p className="text-sm text-gray-600">
              Những sản phẩm giảm giá khổng lồ chỉ trong hôm nay
            </p>
          </div>

          <Button className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
            Xem tất cả
          </Button>
        </div>

        {/* Countdown Timer */}
        <div className="mb-6 sm:mb-8 p-4 bg-red-50 rounded-lg">
          <CountdownTimer endTime={flashSaleEndTime} />
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {mockFlashSaleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="sm:hidden">
            <div
              ref={scrollContainerRef}
              className="flex gap-3 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
              style={{ scrollBehavior: 'smooth' }}
            >
              {mockFlashSaleProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-40">
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>

            {/* Mobile Scroll Buttons */}
            <div className="flex justify-center gap-2 mt-2">
              <button
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Scroll Buttons */}
          <div className="hidden sm:flex absolute left-0 right-0 top-1/2 transform -translate-y-1/2 justify-between pointer-events-none">
            <button
              className="pointer-events-auto -left-2 lg:-left-4 relative p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <button
              className="pointer-events-auto -right-2 lg:-right-4 relative p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleSection;