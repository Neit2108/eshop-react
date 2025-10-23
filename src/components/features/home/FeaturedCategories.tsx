import React from 'react';
import { mockCategories } from '@/pages/home/mockData';

const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-6 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          Danh mục nổi bật
        </h2>

        {/* Desktop Grid - 8 columns */}
        <div className="hidden sm:grid sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {mockCategories.map((category) => (
            <a
              key={category.id}
              href={`/category/${category.id}`}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-3">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
              </div>
              <h3 className="text-center text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </h3>
            </a>
          ))}
        </div>

        {/* Mobile Grid - 4 columns */}
        <div className="sm:hidden grid grid-cols-4 gap-2">
          {mockCategories.map((category) => (
            <a
              key={category.id}
              href={`/category/${category.id}`}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
              </div>
              <h3 className="text-center text-xs font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                <span className="block">{category.icon}</span>
                {category.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;