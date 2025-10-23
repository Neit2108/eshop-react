import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  ChevronDown,
  Rocket,
  User,
  X,
  ChevronRight,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryItem {
  id: string;
  name: string;
  link: string;
  subcategories?: CategoryItem[];
}

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const categories: CategoryItem[] = [
    {
      id: "1",
      name: "Fashion",
      link: "/fashion",
      subcategories: [
        {
          id: "1-1",
          name: "Women",
          link: "/fashion/women",
          subcategories: [
            { id: "1-1-1", name: "Tops", link: "/fashion/women/tops" },
            { id: "1-1-2", name: "Jeans", link: "/fashion/women/jeans" },
          ],
        },
        {
          id: "1-2",
          name: "Girls",
          link: "/fashion/girls",
          subcategories: [
            {
              id: "1-2-1",
              name: "Kurtas & Suits",
              link: "/fashion/girls/kurtas",
            },
            { id: "1-2-2", name: "Sarees", link: "/fashion/girls/sarees" },
            { id: "1-2-3", name: "Tops", link: "/fashion/girls/tops" },
          ],
        },
        {
          id: "1-3",
          name: "Men",
          link: "/fashion/men",
        },
      ],
    },
    {
      id: "2",
      name: "Electronics",
      link: "/electronics",
      subcategories: [
        {
          id: "2-1",
          name: "Mobile",
          link: "/electronics/mobile",
          subcategories: [
            { id: "2-1-1", name: "Apple", link: "/electronics/mobile/apple" },
            {
              id: "2-1-2",
              name: "Samsung",
              link: "/electronics/mobile/samsung",
            },
            { id: "2-1-3", name: "OPPO", link: "/electronics/mobile/oppo" },
            { id: "2-1-4", name: "Vivo", link: "/electronics/mobile/vivo" },
          ],
        },
        { id: "2-2", name: "Laptops", link: "/electronics/laptops" },
        { id: "2-3", name: "Smart Watch", link: "/electronics/smartwatch" },
      ],
    },
    {
      id: "3",
      name: "Bags",
      link: "/bags",
      subcategories: [
        { id: "3-1", name: "Men Bags", link: "/bags/men" },
        { id: "3-2", name: "Women Bags", link: "/bags/women" },
      ],
    },
    {
      id: "4",
      name: "Footwear",
      link: "/footwear",
      subcategories: [
        { id: "4-1", name: "Men Footwear", link: "/footwear/men" },
        { id: "4-2", name: "Women Footwear", link: "/footwear/women" },
      ],
    },
    { id: "5", name: "Groceries", link: "/groceries" },
    { id: "6", name: "Beauty", link: "/beauty" },
    { id: "7", name: "Wellness", link: "/wellness" },
    { id: "8", name: "Jewellery", link: "/jewellery" },
  ];

  const toggleCategoryExpand = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm lg:sticky lg:-top-[47px]">
      {/* Top Strip */}
      <div className="hidden border-t border-b border-gray-200 py-2 lg:block">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
            <div className="w-full sm:w-1/2">
              <p className="text-xs sm:text-sm font-medium">
                Nhận tới 50% OFF trên các sản phẩm được chọn! Mua ngay hôm nay
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-6">
              <a
                href="/help-center"
                className="text-xs sm:text-sm font-medium transition hover:text-blue-600"
              >
                Trung tâm trợ giúp
              </a>
              <a
                href="/order-tracking"
                className="text-xs sm:text-sm font-medium transition hover:text-blue-600"
              >
                Theo dõi đơn hàng
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200 py-2 sm:py-3 lg:py-4">
        <div className="container mx-auto flex items-center justify-between gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="block">
              <img src="https://serviceapi.spicezgold.com/download/1750047766437_logo.jpg" alt="Logo" className="h-8 sm:h-10 w-auto" />
            </a>
          </div>

          {/* Search Box - Desktop */}
          <div className="hidden max-w-2xl flex-1 lg:flex">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-none bg-gray-100 pr-10 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-1/2 right-1 -translate-y-1/2 hover:text-blue-600 cursor-pointer"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {/* Mobile Search Icon */}
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden hover:text-blue-600 h-9 w-9 sm:h-10 sm:w-10"
              onClick={() => {
                /* Handle mobile search */
              }}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Auth Links - Desktop */}
            {!isAuthenticated ? (
              <div className="hidden items-center gap-2 lg:flex">
                <a
                  href="/login"
                  className="text-sm md:text-base font-medium transition hover:text-blue-600"
                >
                  Đăng nhập
                </a>
                <span className="text-gray-400">|</span>
                <a
                  href="/register"
                  className="text-sm md:text-base font-medium transition hover:text-blue-600"
                >
                  Đăng ký
                </a>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="h-15">
                  <Button
                    variant="ghost"
                    className="hidden lg:flex items-center gap-2 md:gap-3 px-2"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 flex-shrink-0">
                      <User className="h-5 w-5 text-gray-700" />
                    </div>
                    <div className="flex flex-col text-left hidden md:flex">
                      <span className="text-sm font-medium text-gray-800 truncate max-w-[150px]">
                        {user?.firstName} {user?.lastName}
                      </span>
                      <span className="text-xs text-gray-600 truncate max-w-[150px]">
                        {user?.email}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <a href="/profile" className="cursor-pointer text-sm">
                      Hồ sơ
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/settings" className="cursor-pointer text-sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Cài đặt
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="cursor-pointer text-red-600 text-sm"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile User Icon */}
            <Button size="icon" variant="ghost" className="lg:hidden h-9 w-9 sm:h-10 sm:w-10">
              <User className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <a href="/wishlist" className="relative">
              <Button size="icon" variant="ghost" className="relative h-9 w-9 sm:h-10 sm:w-10">
                <Heart size={32} className="sm:w-8 sm:h-8" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-red-500 p-0 text-xs">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </a>

            {/* Cart */}
            <Button size="icon" variant="ghost" className="relative h-9 w-9 sm:h-10 sm:w-10">
              <ShoppingCart size={32} className="sm:w-8 sm:h-8" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-red-500 p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden h-9 w-9 sm:h-10 sm:w-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden border-b border-gray-200 lg:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Categories Dropdown */}
            <Button
              variant="ghost"
              className="gap-2 text-sm md:text-base"
              onClick={() => setIsCategorySheetOpen(true)}
            >
              <Menu className="h-4 w-4" />
              Danh mục sản phẩm
              <ChevronDown className="h-4 w-4" />
            </Button>

            {/* Main Navigation */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-3 md:px-4 py-2 text-sm md:text-base font-medium transition-colors hover:text-blue-600"
                  >
                    Trang chủ
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {categories.map((category) => (
                  <NavigationMenuItem key={category.id}>
                    {category.subcategories ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent text-sm md:text-base">
                          {category.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                            {category.subcategories.map((subcat) => (
                              <li key={subcat.id}>
                                <NavigationMenuLink asChild>
                                  <a
                                    href={subcat.link}
                                    className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                                  >
                                    <div className="text-sm leading-none font-medium">
                                      {subcat.name}
                                    </div>
                                    {subcat.subcategories && (
                                      <div className="text-muted-foreground mt-2 text-xs">
                                        {subcat.subcategories
                                          .map((item) => item.name)
                                          .join(", ")}
                                      </div>
                                    )}
                                  </a>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        href={category.link}
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-3 md:px-4 py-2 text-sm md:text-base font-medium transition-colors hover:text-blue-600"
                      >
                        {category.name}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Free Delivery Text */}
            <div className="flex items-center gap-2 text-sm md:text-base font-medium">
              <Rocket className="h-4 w-4" />
              Giao hàng miễn phí
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-40 overflow-y-auto bg-white lg:hidden">
          <div className="p-3 sm:p-4">
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4 w-full text-sm"
            />
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="border-b pb-2">
                  <a
                    href={category.link}
                    className="block py-2 text-sm font-medium hover:text-blue-600"
                  >
                    {category.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category Sheet */}
      <Sheet open={isCategorySheetOpen} onOpenChange={setIsCategorySheetOpen}>
        <SheetContent side="left" className="flex w-80 flex-col p-0">
          <SheetHeader className="border-b p-3 sm:p-4">
            <div className="mb-4 flex items-center justify-between">
              <SheetTitle className="text-base sm:text-lg font-semibold">
                Danh mục sản phẩm
              </SheetTitle>
              <SheetClose asChild>
                <Button size="icon" variant="ghost" className="h-9 w-9 sm:h-10 sm:w-10">
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            <ul className="w-full">
              {categories.map((category) => (
                <li key={category.id} className="list-none border-b">
                  <div className="flex items-center justify-between">
                    <a href={category.link} className="flex-1">
                      <button className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-800 hover:bg-gray-50">
                        {category.name}
                      </button>
                    </a>
                    {category.subcategories &&
                      category.subcategories.length > 0 && (
                        <button
                          onClick={() => toggleCategoryExpand(category.id)}
                          className="flex items-center justify-center px-2 sm:px-3 py-2 sm:py-3 hover:bg-gray-50"
                        >
                          <ChevronRight
                            className={`h-5 w-5 transition-transform ${
                              expandedCategories.includes(category.id)
                                ? "rotate-90"
                                : ""
                            }`}
                          />
                        </button>
                      )}
                  </div>

                  {/* Subcategories */}
                  {category.subcategories &&
                    expandedCategories.includes(category.id) && (
                      <div className="bg-gray-50">
                        {category.subcategories.map((subcat) => (
                          <div key={subcat.id} className="pl-6 sm:pl-8">
                            <a href={subcat.link}>
                              <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-100">
                                {subcat.name}
                              </button>
                            </a>
                            {/* Sub-subcategories */}
                            {subcat.subcategories &&
                              subcat.subcategories.map((item) => (
                                <a key={item.id} href={item.link}>
                                  <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 pl-8 sm:pl-12 text-left text-xs text-gray-600 hover:bg-gray-100">
                                    {item.name}
                                  </button>
                                </a>
                              ))}
                          </div>
                        ))}
                      </div>
                    )}
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
