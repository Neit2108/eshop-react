import React, { useState } from "react";
import { ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const categories = [
  {
    id: 1,
    name: "Điện thoại",
    image:
      "https://serviceapi.spicezgold.com/download/1755610847575_file_1734525204708_fash.png",
  },
  {
    id: 2,
    name: "Electronics",
    image: "https://serviceapi.spicezgold.com/download/1741660988059_ele.png",
  },
  {
    id: 3,
    name: "Bags",
    image: "https://serviceapi.spicezgold.com/download/1741661045887_bag.png",
  },
  {
    id: 4,
    name: "Footwear",
    image: "https://serviceapi.spicezgold.com/download/1741661061379_foot.png",
  },
  {
    id: 5,
    name: "Groceries",
    image: "https://serviceapi.spicezgold.com/download/1741661077633_gro.png",
  },
  {
    id: 6,
    name: "Beauty",
    image:
      "https://serviceapi.spicezgold.com/download/1759725032658_file_1734525255799_beauty.png",
  },
  {
    id: 7,
    name: "Wellness",
    image: "https://serviceapi.spicezgold.com/download/1741661105893_well.png",
  },
  {
    id: 8,
    name: "Jewellery",
    image: "https://serviceapi.spicezgold.com/download/1749273446706_jw.png",
  },
];

const banners = [
  {
    id: 1,
    title: "Quality Freshness Guaranteed!",
    subtitle: "Only this week. Don't miss...",
    price: "from $14.35",
    badge: "-40% OFF",
    bgColor: "from-blue-50 to-green-50",
    buttonText: "Shop Now",
    buttonBg: "bg-red-500 hover:bg-red-600",
  },
  {
    id: 2,
    title: "Summer Collection",
    subtitle: "Exclusive deals available now",
    price: "from $19.99",
    badge: "-35% OFF",
    bgColor: "from-yellow-50 to-orange-50",
    buttonText: "Explore",
    buttonBg: "bg-blue-500 hover:bg-blue-600",
  },
  {
    id: 3,
    title: "New Arrivals",
    subtitle: "Discover the latest products",
    price: "from $9.99",
    badge: "-25% OFF",
    bgColor: "from-pink-50 to-red-50",
    buttonText: "View All",
    buttonBg: "bg-purple-500 hover:bg-purple-600",
  },
];

export default function HeroSection() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  const handleCategoryClick = (id: number) => {
    setSelectedCategory(selectedCategory === id ? null : id);
  };

  return (
    <div className="w-full bg-gray-50">
      {/* Banner Carousel */}
      <div className="relative w-full overflow-hidden bg-white shadow-sm">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.play()}
        >
          <CarouselContent>
            {banners.map((banner) => (
              <CarouselItem key={banner.id}>
                <div
                  className={`bg-gradient-to-r ${banner.bgColor} relative flex min-h-60 sm:min-h-80 md:min-h-96 items-center overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16`}
                >
                  {/* Animated Background Elements */}
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 opacity-30 blur-3xl" />
                  <div className="absolute -bottom-10 -right-20 h-60 w-60 rounded-full bg-white/5 opacity-20 blur-3xl" />

                  <div className="z-10 w-full md:w-1/2">
                    {/* Flash Badge */}
                    <div className="mb-4 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-500 sm:h-5 sm:w-5" />
                      <span className="rounded-full bg-gradient-to-r from-red-400 to-red-500 px-3 py-1 text-xs font-bold text-white shadow-md sm:text-sm">
                        {banner.badge} OFFER
                      </span>
                    </div>

                    {/* Title */}
                    <h1 className="mb-2 text-2xl leading-tight font-bold text-gray-900 sm:mb-3 sm:text-3xl md:text-4xl lg:text-5xl">
                      {banner.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="mb-4 text-xs text-gray-600 sm:mb-6 sm:text-sm md:text-base lg:text-lg">
                      {banner.subtitle}
                    </p>

                    {/* Price */}
                    <p className="mb-6 text-base font-bold text-red-500 sm:mb-8 sm:text-lg md:text-2xl">
                      Starting {banner.price}
                    </p>

                    {/* CTA Button */}
                    <Button
                      className={`group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl sm:px-6 sm:py-3 md:px-8 md:py-3.5 ${banner.buttonBg}`}
                    >
                      {banner.buttonText}
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel Navigation */}
          <CarouselPrevious className="absolute left-2 top-1/2 z-20 -translate-y-1/2 border-0 bg-white/80 shadow-lg transition-all hover:bg-white hover:scale-110 sm:left-4 md:left-6" />
          <CarouselNext className="absolute right-2 top-1/2 z-20 -translate-y-1/2 border-0 bg-white/80 shadow-lg transition-all hover:bg-white hover:scale-110 sm:right-4 md:right-6" />

          {/* Carousel Indicators */}
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-4">
            {banners.map((_, idx) => (
              <div
                key={idx}
                className="h-1.5 w-1.5 rounded-full bg-white/50 transition-all sm:h-2 sm:w-2"
              />
            ))}
          </div>
        </Carousel>
      </div>

      {/* Categories Slider */}
      <div className="border-b border-gray-100 bg-white py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="px-4 sm:px-6 lg:px-12">
          {/* Section Title */}
          <div className="mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-3xl">
              🛍️ Shop by Category
            </h2>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm md:text-base">
              Browse our wide selection of products
            </p>
          </div>

          {/* Categories Carousel */}
          <Carousel
            className="flex w-full justify-center"
            opts={{ align: "center" }}
          >
            <CarouselContent className="-ml-2 justify-center lg:-ml-3">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.id;

                return (
                  <CarouselItem
                    key={category.id}
                    className="flex basis-1/2 justify-center pl-2 sm:basis-1/3 md:basis-1/4 lg:basis-auto lg:pl-3"
                  >
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className={`group flex min-w-[100px] flex-col items-center justify-center rounded-xl px-4 py-3.5 text-center transition-all duration-300 sm:min-w-[120px] sm:px-5 sm:py-4 lg:min-w-[150px] lg:px-6 lg:py-6 ${
                        isSelected
                          ? "bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg ring-2 ring-blue-500 scale-105"
                          : "bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 hover:scale-105 hover:shadow-md"
                      }`}
                    >
                      {/* Category Image */}
                      <div className="relative mb-2 sm:mb-3 overflow-hidden rounded-lg bg-white p-2 sm:p-2.5">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="h-10 w-10 object-cover transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
                        />
                      </div>

                      {/* Category Name */}
                      <h3 className="text-xs font-semibold text-gray-800 transition-colors duration-300 sm:text-sm md:text-base">
                        {category.name}
                      </h3>
                    </button>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Navigation Buttons */}
            <CarouselPrevious className="top-1/2 -left-10 hidden -translate-y-1/2 border-0 bg-blue-500 text-white shadow-lg transition-all hover:bg-blue-600 hover:scale-110 lg:flex" />
            <CarouselNext className="top-1/2 -right-10 hidden -translate-y-1/2 border-0 bg-blue-500 text-white shadow-lg transition-all hover:bg-blue-600 hover:scale-110 lg:flex" />
          </Carousel>

          {/* Promotional Banner Text */}
          <div className="mt-8 flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-4 text-center sm:py-6 md:px-8">
            <p className="text-xs font-semibold text-blue-100 sm:text-sm">
              ⭐ SPECIAL OFFER
            </p>
            <p className="mt-2 text-sm font-bold text-white sm:text-base md:text-lg">
              Free Delivery on Orders Over $50 - Limited Time Offer!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
