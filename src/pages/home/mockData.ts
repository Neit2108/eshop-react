// src/pages/home/mockData.ts

export interface ICategory {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  sold: number;
  stockLimit?: number;
  discount?: number;
  isFeatured?: boolean;
  vendor?: string;
}

export interface IVendor {
  id: string;
  name: string;
  logo: string;
  store_url: string;
}

export interface IBanner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
}

// Mock Categories
export const mockCategories: ICategory[] = [
  {
    id: '1',
    name: 'Điện thoại',
    icon: '📱',
    image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Laptop',
    icon: '💻',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Thời trang',
    icon: '👔',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'Giày dép',
    icon: '👟',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
  },
  {
    id: '5',
    name: 'Phụ kiện',
    icon: '⌚',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
  },
  {
    id: '6',
    name: 'Sắc đẹp',
    icon: '💄',
    image: 'https://images.unsplash.com/photo-1596462502278-bc48d0cfbbf0?w=400&h=400&fit=crop',
  },
  {
    id: '7',
    name: 'Nhà & Bếp',
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
  },
  {
    id: '8',
    name: 'Thể thao',
    icon: '⚽',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop',
  },
];

// Mock Products for Flash Sale
export const mockFlashSaleProducts: IProduct[] = [
  {
    id: 'fs1',
    name: 'iPhone 15 Pro Max 256GB',
    price: 25999000,
    originalPrice: 32999000,
    image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=300&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 2543,
    sold: 1204,
    stockLimit: 1500,
    discount: 21,
    vendor: 'Điện thoại Giá Rẻ',
  },
  {
    id: 'fs2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 22999000,
    originalPrice: 29999000,
    image: 'https://images.unsplash.com/photo-1511634556800-fd9e6b43c01b?w=300&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 1876,
    sold: 987,
    stockLimit: 1000,
    discount: 23,
    vendor: 'Tech World',
  },
  {
    id: 'fs3',
    name: 'Apple iPad Pro 12.9" M2',
    price: 18999000,
    originalPrice: 24999000,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=300&fit=crop',
    rating: 4.9,
    reviewCount: 1234,
    sold: 654,
    stockLimit: 800,
    discount: 24,
    vendor: 'Apple Store Official',
  },
  {
    id: 'fs4',
    name: 'Sony WH-1000XM5 Headphones',
    price: 7999000,
    originalPrice: 10999000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 3421,
    sold: 2156,
    stockLimit: 3000,
    discount: 27,
    vendor: 'Audio Pro',
  },
];

// Mock Recommended Products
export const mockRecommendedProducts: IProduct[] = [
  {
    id: 'rec1',
    name: 'Xiaomi 14 Ultra',
    price: 16999000,
    originalPrice: 19999000,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop',
    rating: 4.6,
    reviewCount: 987,
    sold: 543,
    discount: 15,
    vendor: 'Xiaomi Official',
  },
  {
    id: 'rec2',
    name: 'Google Pixel 8 Pro',
    price: 19999000,
    originalPrice: 23999000,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 1543,
    sold: 876,
    discount: 17,
    vendor: 'Google Store',
  },
  {
    id: 'rec3',
    name: 'OnePlus 12',
    price: 14999000,
    originalPrice: 17999000,
    image: 'https://images.unsplash.com/photo-1511634556800-fd9e6b43c01b?w=300&h=300&fit=crop',
    rating: 4.5,
    reviewCount: 654,
    sold: 432,
    discount: 17,
    vendor: 'OnePlus Vietnam',
  },
  {
    id: 'rec4',
    name: 'Oppo Find X6 Pro',
    price: 18499000,
    originalPrice: 21999000,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop',
    rating: 4.6,
    reviewCount: 765,
    sold: 567,
    discount: 16,
    vendor: 'Oppo Official',
  },
  {
    id: 'rec5',
    name: 'MacBook Pro 16" M3',
    price: 49999000,
    originalPrice: 59999000,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=300&fit=crop',
    rating: 4.9,
    reviewCount: 2109,
    sold: 234,
    discount: 17,
    vendor: 'Apple Store Official',
  },
  {
    id: 'rec6',
    name: 'Dell XPS 15',
    price: 35999000,
    originalPrice: 42999000,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 876,
    sold: 345,
    discount: 16,
    vendor: 'Dell Vietnam',
  },
  {
    id: 'rec7',
    name: 'LG 32" 4K Monitor',
    price: 12999000,
    originalPrice: 15999000,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
    rating: 4.6,
    reviewCount: 543,
    sold: 298,
    discount: 19,
    vendor: 'LG Official Store',
  },
  {
    id: 'rec8',
    name: 'Samsung 27" 144Hz Gaming',
    price: 10999000,
    originalPrice: 13999000,
    image: 'https://images.unsplash.com/photo-1593642632605-70d3fa7b5d1a?w=300&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 1234,
    sold: 567,
    discount: 21,
    vendor: 'Samsung Vietnam',
  },
];

// Mock Trending Products
export const mockTrendingProducts: IProduct[] = [
  {
    id: 'trend1',
    name: 'AirPods Pro Max',
    price: 14999000,
    originalPrice: 17999000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    rating: 4.9,
    reviewCount: 2876,
    sold: 1543,
    discount: 17,
    vendor: 'Apple Authorized',
  },
  {
    id: 'trend2',
    name: 'DJI Air 3S Drone',
    price: 28999000,
    originalPrice: 34999000,
    image: 'https://images.unsplash.com/photo-1509670811191-ad1b909be268?w=300&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 654,
    sold: 287,
    discount: 17,
    vendor: 'DJI Vietnam',
  },
  {
    id: 'trend3',
    name: 'GoPro Hero 12 Black',
    price: 12999000,
    originalPrice: 15999000,
    image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=300&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 876,
    sold: 432,
    discount: 19,
    vendor: 'GoPro Store',
  },
  {
    id: 'trend4',
    name: 'Samsung Galaxy Watch 6',
    price: 7999000,
    originalPrice: 10999000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 1543,
    sold: 876,
    discount: 27,
    vendor: 'Samsung Vietnam',
  },
  {
    id: 'trend5',
    name: 'Bose QuietComfort Ultra',
    price: 9999000,
    originalPrice: 12999000,
    image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=300&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 1234,
    sold: 654,
    discount: 23,
    vendor: 'Bose Official',
  },
  {
    id: 'trend6',
    name: 'Nintendo Switch OLED',
    price: 11999000,
    originalPrice: 14999000,
    image: 'https://images.unsplash.com/photo-1573985618454-fdf75bc4f38a?w=300&h=300&fit=crop',
    rating: 4.9,
    reviewCount: 2109,
    sold: 1234,
    discount: 20,
    vendor: 'Nintendo Official',
  },
  {
    id: 'trend7',
    name: 'PS5 Console',
    price: 14999000,
    originalPrice: 17999000,
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 3456,
    sold: 2345,
    discount: 17,
    vendor: 'PlayStation Store',
  },
  {
    id: 'trend8',
    name: 'Meta Quest 3',
    price: 13999000,
    originalPrice: 16999000,
    image: 'https://images.unsplash.com/photo-1617638924702-92f37fc3a5bb?w=300&h=300&fit=crop',
    rating: 4.6,
    reviewCount: 876,
    sold: 543,
    discount: 18,
    vendor: 'Meta Official',
  },
];

// Mock Banners
export const mockBanners: IBanner[] = [
  {
    id: '1',
    title: 'DEAL SỐC HÔM NAY',
    subtitle: 'Giảm giá lên đến 50% cho tất cả các sản phẩm điện tử',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop',
    cta: 'Mua ngay',
    link: '/flash-sale',
  },
  {
    id: '2',
    title: 'CÔNG NGHỆ TIÊN TIẾN',
    subtitle: 'Khám phá những sản phẩm công nghệ mới nhất 2024',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=400&fit=crop',
    cta: 'Xem thêm',
    link: '/new-products',
  },
  {
    id: '3',
    title: 'THỜI TRANG XUÂN HẠ',
    subtitle: 'Bộ sưu tập thời trang mới với thiết kế độc đáo',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200&h=400&fit=crop',
    cta: 'Khám phá',
    link: '/fashion',
  },
];

// Mock Vendors
export const mockVendors: IVendor[] = [
  {
    id: 'v1',
    name: 'Apple Official Store',
    logo: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=200&h=100&fit=crop',
    store_url: '/vendor/apple',
  },
  {
    id: 'v2',
    name: 'Samsung Vietnam',
    logo: 'https://images.unsplash.com/photo-1598318773928-b82d6e2e3c5b?w=200&h=100&fit=crop',
    store_url: '/vendor/samsung',
  },
  {
    id: 'v3',
    name: 'Sony Electronics',
    logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=100&fit=crop',
    store_url: '/vendor/sony',
  },
  {
    id: 'v4',
    name: 'Dell Computers',
    logo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&h=100&fit=crop',
    store_url: '/vendor/dell',
  },
  {
    id: 'v5',
    name: 'Xiaomi Vietnam',
    logo: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&h=100&fit=crop',
    store_url: '/vendor/xiaomi',
  },
  {
    id: 'v6',
    name: 'Google Store',
    logo: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=100&fit=crop',
    store_url: '/vendor/google',
  },
];