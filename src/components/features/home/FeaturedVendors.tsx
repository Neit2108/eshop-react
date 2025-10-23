import React from 'react';
import { Button } from '@/components/ui/button';
import { Store, ChevronRight } from 'lucide-react';
import { mockVendors } from '@/pages/home/mockData';

const FeaturedVendors: React.FC = () => {
  return (
    <section className="py-6 sm:py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
              Thương hiệu nổi bật
            </h2>
          </div>
          <Button
            variant="outline"
            className="w-full sm:w-auto flex items-center justify-center gap-2"
          >
            Xem tất cả gian hàng
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Desktop Grid - 6 columns */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {mockVendors.map((vendor) => (
            <a
              key={vendor.id}
              href={vendor.store_url}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg bg-white border-2 border-gray-200 hover:border-blue-600 aspect-video mb-2 transition-all">
                <img
                  src={vendor.logo}
                  alt={vendor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
              </div>
              <h3 className="text-center text-xs sm:text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                {vendor.name}
              </h3>
            </a>
          ))}
        </div>

        {/* Mobile Grid - 3 columns */}
        <div className="sm:hidden grid grid-cols-3 gap-2">
          {mockVendors.map((vendor) => (
            <a
              key={vendor.id}
              href={vendor.store_url}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg bg-white border-2 border-gray-200 hover:border-blue-600 aspect-video mb-1 transition-all">
                <img
                  src={vendor.logo}
                  alt={vendor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
              </div>
              <h3 className="text-center text-xs font-medium text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                {vendor.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;