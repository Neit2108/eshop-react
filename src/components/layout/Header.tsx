import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  ChevronDown,
  Rocket,
  User,
  X,
  ChevronRight,
  LogOut,
  LucideMessagesSquare,
  PackageCheck,
  Wallet,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useWallet } from "@/hooks/useWallet";
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
import { ROUTES } from "@/lib/constants";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "@/lib/api";

interface CategoryItem {
  id: string;
  name: string;
  link: string;
  subcategories?: CategoryItem[];
}

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemsCount, fetchCart } = useCart();
  const {
    address,
    balance,
    tokenBalance,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    getTokenBalance,
  } = useWallet();
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistCount, setWishlistCount] = useState(3);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Fetch cart khi component mount
  React.useEffect(() => {
    setWishlistCount(9);
    fetchCart();
  }, []);

  // Fetch token balance when wallet is connected
  useEffect(() => {
    if (address) {
      // cashback token address
      const cashbackAddress = "0xCbbcAa25708E8b05BA800bB6e09d551D76a477d1";
      const cashbackDecimals = 18;
      const cashbackSymbol = "CASH";
      getTokenBalance(cashbackAddress, cashbackDecimals, cashbackSymbol);
    }
  }, [address, getTokenBalance]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const categories: CategoryItem[] = [
    {
      id: "1",
      name: "Thời trang",
      link: "/fashion",
      subcategories: [
        {
          id: "1-1",
          name: "Phụ nữ",
          link: "/fashion/women",
          subcategories: [
            { id: "1-1-1", name: "Tops", link: "/fashion/women/tops" },
            { id: "1-1-2", name: "Jeans", link: "/fashion/women/jeans" },
          ],
        },
        {
          id: "1-2",
          name: "Trẻ em gái",
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
          name: "Nam",
          link: "/fashion/men",
        },
      ],
    },
    {
      id: "2",
      name: "Điện tử",
      link: "/electronics",
      subcategories: [
        {
          id: "2-1",
          name: "Di động",
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
        { id: "2-2", name: "Máy tính xách tay", link: "/electronics/laptops" },
        { id: "2-3", name: "Đồng hồ thông minh", link: "/electronics/smartwatch" },
      ],
    },
    {
      id: "3",
      name: "Túi xách",
      link: "/bags",
      subcategories: [
        { id: "3-1", name: "Túi nam", link: "/bags/men" },
        { id: "3-2", name: "Túi nữ", link: "/bags/women" },
      ],
    },
    {
      id: "4",
      name: "Giày dép",
      link: "/footwear",
      subcategories: [
        { id: "4-1", name: "Giày nam", link: "/footwear/men" },
        { id: "4-2", name: "Giày nữ", link: "/footwear/women" },
      ],
    },
    { id: "5", name: "Tạp hóa", link: "/groceries" },
    { id: "6", name: "Làm đẹp", link: "/beauty" },
    { id: "7", name: "Sức khỏe", link: "/wellness" },
    { id: "8", name: "Trang sức", link: "/jewellery" },
  ];

  const toggleCategoryExpand = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleCartClick = () => {
    navigate(ROUTES.CART);
  };

  const handleSearch = () => {
    // redirect to products page with search query
    navigate(
      `${API_ENDPOINTS.PRODUCTS.LIST}?searchTerm=${encodeURIComponent(searchQuery)}`,
    );
  };

  // Tính toán cartCount để hiển thị, nếu > 99 thì hiện "99+"
  const displayCartCount = itemsCount > 99 ? "99+" : itemsCount;

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm lg:sticky lg:-top-[47px]">
      {/* Top Strip */}
      <div className="hidden border-t border-b border-gray-200 py-2 lg:block">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="w-full sm:w-1/2">
              <p className="text-xs font-medium sm:text-sm">
                Nhận tới 50% OFF trên các sản phẩm được chọn! Mua ngay hôm nay
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-6">
              <a
                href="/help-center"
                className="text-xs font-medium transition hover:text-blue-600 sm:text-sm"
              >
                Trung tâm trợ giúp
              </a>
              <a
                href="/order-tracking"
                className="text-xs font-medium transition hover:text-blue-600 sm:text-sm"
              >
                Theo dõi đơn hàng
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200 py-2 sm:py-3 lg:py-4">
        <div className="container mx-auto flex items-center justify-between gap-2 px-3 sm:gap-3 sm:px-4 md:gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="block">
              <img
                src="https://serviceapi.spicezgold.com/download/1750047766437_logo.jpg"
                alt="Logo"
                className="h-8 w-auto sm:h-10"
              />
            </a>
          </div>

          {/* Search Box - Desktop */}
          <div className="hidden max-w-2xl flex-1 lg:flex">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-none bg-gray-100 pr-10 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer hover:text-blue-600"
                onClick={handleSearch}
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
              className="h-9 w-9 hover:text-blue-600 sm:h-10 sm:w-10 lg:hidden"
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
                  className="text-sm font-medium transition hover:text-blue-600 md:text-base"
                >
                  Đăng nhập
                </a>
                <span className="text-gray-400">|</span>
                <a
                  href="/register"
                  className="text-sm font-medium transition hover:text-blue-600 md:text-base"
                >
                  Đăng ký
                </a>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="h-15">
                  <Button
                    variant="ghost"
                    className="hidden items-center gap-2 px-2 md:gap-3 lg:flex"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
                      <User className="h-5 w-5 text-gray-700" />
                    </div>
                    <div className="hidden flex-col text-left md:flex">
                      <span className="max-w-[150px] truncate text-sm font-medium text-gray-800">
                        {user?.firstName} {user?.lastName}
                      </span>
                      <span className="max-w-[150px] truncate text-xs text-gray-600">
                        {user?.email}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  {/* Wallet Section */}
                  <div className="border-b px-4 py-3">
                    <div className="mb-2 flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      <span className="text-sm font-semibold">
                        Ví Blockchain
                      </span>
                    </div>
                    {!address ? (
                      <Button
                        onClick={connectWallet}
                        disabled={isConnecting}
                        size="sm"
                        className="w-full bg-blue-600 text-xs text-white hover:bg-blue-700"
                      >
                        {isConnecting ? "Đang kết nối..." : "Kết nối Ví"}
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <div className="rounded bg-gray-50 p-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-600">
                              Địa chỉ:
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="font-mono font-medium">
                                {formatAddress(address)}
                              </span>
                              <button
                                onClick={() => copyToClipboard(address)}
                                className="rounded p-1 transition hover:bg-gray-200"
                                title="Copy địa chỉ ví"
                              >
                                {copiedAddress ? (
                                  <Check className="h-3 w-3 text-green-600" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        {balance && (
                          <div className="rounded bg-gray-50 p-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-600">
                                ETH:
                              </span>
                              <span className="font-medium">
                                {parseFloat(balance).toFixed(4)} ETH
                              </span>
                            </div>
                          </div>
                        )}
                        {tokenBalance && (
                          <div className="rounded bg-gray-50 p-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-600">
                                Token:
                              </span>
                              <span className="font-medium">
                                {tokenBalance}
                              </span>
                            </div>
                          </div>
                        )}
                        {error && (
                          <div className="rounded bg-red-50 p-2 text-xs text-red-600">
                            {error}
                          </div>
                        )}
                        <Button
                          onClick={disconnectWallet}
                          size="sm"
                          variant="outline"
                          className="w-full text-xs"
                        >
                          Ngắt kết nối
                        </Button>
                      </div>
                    )}
                  </div>

                  <DropdownMenuItem asChild>
                    <a href="/profile" className="cursor-pointer text-sm">
                      Hồ sơ
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/orders" className="cursor-pointer text-sm">
                      <PackageCheck className="mr-2 h-4 w-4" />
                      Đơn hàng
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="cursor-pointer text-sm text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile User Icon */}
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 sm:h-10 sm:w-10 lg:hidden"
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <a href="/chat" className="relative">
              <Button
                size="icon"
                variant="ghost"
                className="relative h-9 w-9 sm:h-10 sm:w-10"
              >
                <LucideMessagesSquare size={32} className="sm:h-8 sm:w-8" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-red-500 p-0 text-xs">
                    9+
                  </Badge>
                )}
              </Button>
            </a>

            {/* Cart */}
            <Button
              size="icon"
              variant="ghost"
              className="relative h-9 w-9 sm:h-10 sm:w-10"
              onClick={handleCartClick}
            >
              <ShoppingCart size={32} className="sm:h-8 sm:w-8" />
              {itemsCount > 0 && (
                <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-red-500 p-0 text-xs">
                  {displayCartCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 sm:h-10 sm:w-10 lg:hidden"
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
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 md:px-4 md:text-base"
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
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 md:px-4 md:text-base"
                      >
                        {category.name}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Free Delivery Text */}
            <div className="flex items-center gap-2 text-sm font-medium md:text-base">
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
              <SheetTitle className="text-base font-semibold sm:text-lg">
                Danh mục sản phẩm
              </SheetTitle>
              <SheetClose asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 sm:h-10 sm:w-10"
                >
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
                      <button className="w-full px-3 py-2 text-left text-xs font-medium text-gray-800 hover:bg-gray-50 sm:px-4 sm:py-3 sm:text-sm">
                        {category.name}
                      </button>
                    </a>
                    {category.subcategories &&
                      category.subcategories.length > 0 && (
                        <button
                          onClick={() => toggleCategoryExpand(category.id)}
                          className="flex items-center justify-center px-2 py-2 hover:bg-gray-50 sm:px-3 sm:py-3"
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
                              <button className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-100 sm:px-4 sm:py-2 sm:text-sm">
                                {subcat.name}
                              </button>
                            </a>
                            {/* Sub-subcategories */}
                            {subcat.subcategories &&
                              subcat.subcategories.map((item) => (
                                <a key={item.id} href={item.link}>
                                  <button className="w-full px-3 py-1.5 pl-8 text-left text-xs text-gray-600 hover:bg-gray-100 sm:px-4 sm:py-2 sm:pl-12">
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
