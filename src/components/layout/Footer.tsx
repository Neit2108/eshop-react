import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all opacity-0 hover:opacity-100 z-30"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                Đăng ký nhận tin tức
              </h3>
              <p className="text-sm text-blue-100">
                Nhận ưu đãi độc quyền và cập nhật sản phẩm mới
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 sm:flex-none sm:w-64"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-white font-bold text-lg mb-4">MarketPlace</h4>
            <p className="text-sm text-gray-400 mb-4">
              Nền tảng mua sắm trực tuyến hàng đầu Việt Nam với hàng triệu sản phẩm chất lượng.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-bold mb-4">Về chúng tôi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Báo chí
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Liên hệ chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Sellers */}
          <div>
            <h4 className="text-white font-bold mb-4">Cho người bán</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Đăng ký cửa hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Hướng dẫn bán hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Quảng cáo trên sàn
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Seller Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">1900 6969</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">support@marketplace.vn</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6" />

        {/* Bottom Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-sm">
            <p className="text-gray-400 mb-2">Thanh toán an toàn</p>
            <div className="flex gap-2 text-xs text-gray-500">
              Visa • Mastercard • E-wallet • COD
            </div>
          </div>
          <div className="text-sm">
            <p className="text-gray-400 mb-2">Giao hàng</p>
            <div className="flex gap-2 text-xs text-gray-500">
              Giao tiêu chuẩn • Giao nhanh • Giao siêu nhanh
            </div>
          </div>
          <div className="text-sm">
            <p className="text-gray-400 mb-2">Bảo vệ người mua</p>
            <div className="flex gap-2 text-xs text-gray-500">
              Hoàn tiền 100% • Bảo hành • Hỗ trợ 24/7
            </div>
          </div>
          <div className="text-sm">
            <p className="text-gray-400 mb-2">Ứng dụng di động</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs h-8">
                iOS
              </Button>
              <Button variant="outline" size="sm" className="text-xs h-8">
                Android
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>
            © 2024 MarketPlace Vietnam. Tất cả các quyền được bảo lưu. |{' '}
            <a href="#" className="hover:text-gray-300 transition-colors">
              Chính sách bảo mật
            </a>
            {' '} |{' '}
            <a href="#" className="hover:text-gray-300 transition-colors">
              Điều khoản dịch vụ
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;