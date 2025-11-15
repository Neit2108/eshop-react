# eShop React - Hướng Dẫn Toàn Bộ

Một ứng dụng web thương mại điện tử hiện đại được xây dựng bằng **React**, **TypeScript**, **Tailwind CSS** và **Redux Toolkit**.

## 📋 Mục Lục

- [Giới Thiệu](#giới-thiệu)
- [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
- [Cài Đặt](#cài-đặt)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Chạy Ứng Dụng](#chạy-ứng-dụng)
- [Hướng Dẫn Phát Triển](#hướng-dẫn-phát-triển)
- [API Endpoints](#api-endpoints)
- [Quản Lý State](#quản-lý-state)
- [Các Thành Phần Chính](#các-thành-phần-chính)
- [Styling](#styling)
- [Hooks Tùy Chỉnh](#hooks-tùy-chỉnh)
- [Kiểm Tra & Xây Dựng](#kiểm-tra--xây-dựng)

---

## 🎯 Giới Thiệu

**eShop React** là một nền tảng thương mại điện tử đầy đủ chức năng bao gồm:

✅ Trang chủ với sản phẩm nổi bật
✅ Danh mục sản phẩm và tìm kiếm
✅ Quản lý giỏ hàng
✅ Thanh toán an toàn
✅ Hệ thống xác thực (Đăng ký/Đăng nhập)
✅ Bảng điều khiển quản trị viên
✅ Quản lý đơn hàng
✅ Đánh giá và nhận xét sản phẩm
✅ Giao diện người dùng đáp ứng

---

## 🛠 Yêu Cầu Hệ Thống

Trước khi cài đặt, đảm bảo bạn có:

- **Node.js**: Phiên bản 16.0 trở lên
- **npm** hoặc **yarn**: Trình quản lý gói
- **Git**: Để sao chép kho lưu trữ

Kiểm tra phiên bản:
```bash
node --version
npm --version
```

---

## 📦 Cài Đặt

### 1. Sao chép kho lưu trữ
```bash
git clone https://github.com/Neit2108/eshop-react.git
cd eshop-react
```

### 2. Cài đặt các gói phụ thuộc
```bash
npm install
```

### 3. Cấu hình môi trường (nếu cần)
Tạo tệp `.env` trong thư mục gốc và cấu hình các biến môi trường:
```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
```

---

## 📁 Cấu Trúc Dự Án

```
eshop-react/
├── src/
│   ├── assets/              # Hình ảnh, font, v.v.
│   ├── components/          # Các thành phần React
│   │   ├── common/          # Thành phần chung (ErrorBoundary, Loading, etc)
│   │   ├── features/        # Các tính năng chính
│   │   │   ├── admin/       # Thành phần quản trị viên
│   │   │   ├── cart/        # Thành phần giỏ hàng
│   │   │   ├── checkout/    # Thành phần thanh toán
│   │   │   ├── home/        # Thành phần trang chủ
│   │   │   ├── login/       # Thành phần đăng nhập
│   │   │   ├── products/    # Thành phần sản phẩm
│   │   │   ├── reviews/     # Thành phần đánh giá
│   │   │   └── signup/      # Thành phần đăng ký
│   │   ├── layout/          # Bố cục chính (Header, Footer, Sidebar)
│   │   └── ui/              # Thư viện UI (Button, Card, Input, etc)
│   ├── hooks/               # Hooks tùy chỉnh
│   ├── lib/                 # Tiện ích và hằng số
│   │   ├── api.ts           # Cấu hình API endpoints
│   │   ├── constants.ts     # Hằng số ứng dụng
│   │   ├── utils.ts         # Hàm tiện ích chung
│   │   └── helpers/         # Các hàm trợ giúp
│   ├── pages/               # Trang cấp cao nhất
│   ├── services/            # Dịch vụ API
│   ├── store/               # Cấu hình Redux
│   │   └── slices/          # Redux slices
│   ├── types/               # TypeScript types
│   ├── App.tsx              # Thành phần chính ứng dụng
│   ├── AdminApp.tsx         # Ứng dụng quản trị viên
│   ├── Router.tsx           # Cấu hình routing
│   ├── main.tsx             # Điểm vào ứng dụng
│   └── index.css            # Kiểu chung
├── public/                  # Tài sản công khai tĩnh
├── package.json             # Phụ thuộc và scripts
├── tsconfig.json            # Cấu hình TypeScript
├── vite.config.ts           # Cấu hình Vite
├── tailwind.config.js       # Cấu hình Tailwind CSS
├── eslint.config.js         # Cấu hình ESLint
└── README_VI.md             # Hướng dẫn này
```

---

## 🚀 Chạy Ứng Dụng

### Môi Trường Phát Triển
Khởi động máy chủ phát triển với Hot Reload:
```bash
npm run dev
```
Ứng dụng sẽ có sẵn tại `http://localhost:5173`

### Xây Dựng cho Production
```bash
npm run build
```
Các tệp được tối ưu hóa sẽ nằm trong thư mục `dist/`

### Xem Trước Build Production
```bash
npm run preview
```

---

## 📖 Hướng Dẫn Phát Triển

### Tạo Thành Phần Mới

1. **Tạo thư mục thành phần**
```bash
src/components/features/myfeature/MyComponent.tsx
```

2. **Viết thành phần**
```tsx
import React from 'react'
import { Button } from '@/components/ui/button'

interface MyComponentProps {
  title: string
}

export default function MyComponent({ title }: MyComponentProps) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Button>Nhấp vào tôi</Button>
    </div>
  )
}
```

3. **Xuất từ index.ts** (nếu thư mục có)
```ts
export { default as MyComponent } from './MyComponent'
```

### Thêm Trang Mới

1. Tạo tệp trang trong `src/pages/`
2. Thêm route vào `src/Router.tsx`
```tsx
{
  path: '/new-page',
  element: <NewPage />,
}
```

---

## 🔗 API Endpoints

API endpoints được định nghĩa trong `src/lib/api.ts`:

```ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: '/products/:id',
    CREATE: '/products',
    UPDATE: '/products/:id',
    DELETE: '/products/:id',
  },
  CATEGORIES: {
    LIST: '/categories',
  },
  CART: {
    GET: '/cart',
    ADD: '/cart/items',
    REMOVE: '/cart/items/:id',
    UPDATE: '/cart/items/:id',
  },
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    DETAIL: '/orders/:id',
  },
  // ...
}
```

---

## 📊 Quản Lý State

Ứng dụng sử dụng **Redux Toolkit** để quản lý state toàn cầu.

### Redux Slices

Các slices được lưu trữ trong `src/store/slices/`:

- **authSlice** - Quản lý trạng thái xác thực
- **cartSlice** - Quản lý giỏ hàng
- **productSlice** - Quản lý sản phẩm
- **orderSlice** - Quản lý đơn hàng
- **categorySlice** - Quản lý danh mục
- **adminSlice** - Quản lý dữ liệu quản trị viên
- **uiSlice** - Quản lý trạng thái UI

### Sử Dụng Redux trong Thành Phần

```tsx
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/store/slices/cartSlice'

export default function ProductCard() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.items)

  const handleAddToCart = () => {
    dispatch(addToCart({ id: 1, name: 'Sản phẩm', price: 100 }))
  }

  return (
    <button onClick={handleAddToCart}>
      Thêm vào giỏ hàng ({cart.length})
    </button>
  )
}
```

---

## 🧩 Các Thành Phần Chính

### Common Components

- **ErrorBoundary** - Bắt lỗi React và hiển thị UI thay thế
- **Loading** - Hiển thị loading spinner
- **ProtectedRoute** - Bảo vệ route, yêu cầu xác thực

### Layout Components

- **Header** - Thanh điều hướng chính
- **Sidebar** - Thanh bên cho điều hướng
- **Footer** - Chân trang
- **MainLayout** - Bố cục chính cho ứng dụng người dùng
- **Admin Layout** - Bố cục cho panel quản trị viên

### Feature Components

**Home** (Trang chủ)
- `CountdownTimer` - Bộ đếm ngược cho các khuyến mãi
- `FeaturedCategories` - Hiển thị danh mục nổi bật

**Products** (Sản phẩm)
- `ProductCard` - Thẻ sản phẩm
- `ProductList` - Danh sách sản phẩm

**Cart** (Giỏ hàng)
- `CartItem` - Mục giỏ hàng
- `CartSummary` - Tóm tắt giỏ hàng

**Checkout** (Thanh toán)
- `OrderSummary` - Tóm tắt đơn hàng
- `AddressModal` - Mô-đun nhập địa chỉ
- `RecipientSection` - Phần thông tin người nhận

---

## 🎨 Styling

### Tailwind CSS

Ứng dụng sử dụng **Tailwind CSS** cho styling:

```tsx
<div className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
  <h2 className="text-xl font-bold text-gray-800">Tiêu đề</h2>
  <button className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600">
    Nút
  </button>
</div>
```

### Radix UI Components

Thành phần UI được xây dựng trên **Radix UI** và được styling bằng Tailwind:

```tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Form() {
  return (
    <Card>
      <Input placeholder="Nhập tên..." />
      <Button>Gửi</Button>
    </Card>
  )
}
```

### Màu Sắc Tùy Chỉnh

Màu sắc được định nghĩa trong `tailwind.config.js`:

```js
colors: {
  primary: '#3B82F6',
  secondary: '#10B981',
  danger: '#EF4444',
  // ...
}
```

---

## 🪝 Hooks Tùy Chỉnh

### useAuth
Quản lý thông tin xác thực người dùng:

```tsx
import { useAuth } from '@/hooks/useAuth'

export default function Profile() {
  const { user, isAuthenticated, login, logout } = useAuth()

  if (!isAuthenticated) {
    return <div>Vui lòng đăng nhập</div>
  }

  return (
    <div>
      <p>Xin chào, {user?.name}!</p>
      <button onClick={logout}>Đăng xuất</button>
    </div>
  )
}
```

### useFetch
Lấy dữ liệu từ API:

```tsx
import { useFetch } from '@/hooks/useFetch'
import { API_ENDPOINTS } from '@/lib/api'

export default function UserList() {
  const { data, loading, error } = useFetch(API_ENDPOINTS.USERS.LIST)

  if (loading) return <div>Đang tải...</div>
  if (error) return <div>Lỗi: {error.message}</div>

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### useCart
Quản lý giỏ hàng:

```tsx
import { useCart } from '@/hooks/useCart'

export default function CartPage() {
  const { items, total, addItem, removeItem, clearCart } = useCart()

  return (
    <div>
      <p>Tổng: ${total}</p>
      <button onClick={clearCart}>Xóa giỏ hàng</button>
    </div>
  )
}
```

### useProducts
Quản lý dữ liệu sản phẩm:

```tsx
import { useProducts } from '@/hooks/useProducts'

export default function ProductsPage() {
  const { products, loading, filters, setFilters } = useProducts()

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### useCategory
Quản lý danh mục:

```tsx
import { useCategory } from '@/hooks/useCategory'

export default function Categories() {
  const { categories, loading } = useCategory()

  if (loading) return <div>Đang tải...</div>

  return (
    <div className="grid grid-cols-4 gap-4">
      {categories.map((cat) => (
        <CategoryCard key={cat.id} category={cat} />
      ))}
    </div>
  )
}
```

### useAdmin
Quản lý dữ liệu quản trị viên:

```tsx
import { useAdmin } from '@/hooks/useAdmin'

export default function AdminDashboard() {
  const { stats, createProduct, updateProduct } = useAdmin()

  return (
    <div>
      <p>Tổng doanh số: ${stats?.totalRevenue}</p>
    </div>
  )
}
```

---

## 🔄 Gọi API

### Cách 1: Sử dụng Hook useFetch (Đơn Giản)

Để **chỉ đọc** dữ liệu:

```tsx
import { useFetch } from '@/hooks/useFetch'
import { API_ENDPOINTS } from '@/lib/api'

export default function UserList() {
  const { data, loading, error } = useFetch(API_ENDPOINTS.USERS.LIST)

  if (loading) return <div>Đang tải...</div>
  if (error) return <div>Lỗi: {error.message}</div>

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### Cách 2: Sử dụng API Service (Ghi Dữ Liệu)

Để **thay đổi dữ liệu** (POST, PUT, DELETE):

```tsx
import { useState, useEffect } from 'react'
import { apiService } from '@/services/apiService'
import { API_ENDPOINTS } from '@/lib/api'

export default function CreateUser() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCreateUser = async (userData) => {
    setLoading(true)
    try {
      const response = await apiService.post(API_ENDPOINTS.USERS.CREATE, userData)
      console.log('Người dùng được tạo:', response.data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleCreateUser({ name: 'John', email: 'john@example.com' })
    }}>
      <button type="submit" disabled={loading}>
        {loading ? 'Đang tạo...' : 'Tạo người dùng'}
      </button>
    </form>
  )
}
```

---

## ✅ Kiểm Tra & Xây Dựng

### Chạy ESLint
```bash
npm run lint
```

### Sửa Lỗi Tự Động
```bash
npm run lint -- --fix
```

### Xây Dựng Toàn Bộ
```bash
npm run build
```

---

## 🎓 Các Mẫu Phổ Biến

### Tạo Form với Xác Thực

```tsx
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { validateEmail } from '@/lib/helpers/validation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!validateEmail(email)) {
      newErrors.email = 'Email không hợp lệ'
    }
    if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Gửi form
    console.log({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div>
        <Input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>
      <Button type="submit">Đăng Nhập</Button>
    </form>
  )
}
```

### Trang được Bảo Vệ

```tsx
import { ProtectedRoute } from '@/components/common/ProtectedRoute'
import Dashboard from '@/pages/admin/Dashboard'

export const adminRoutes = [
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute requiredRole="admin">
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]
```

---

## 🐛 Khắc Phục Sự Cố

### Port 5173 Đã Sử Dụng
```bash
# Sử dụng port khác
npm run dev -- --port 3000
```

### Lỗi TypeScript Khi Xây Dựng
```bash
# Xóa thư mục dist và xây dựng lại
rm -rf dist
npm run build
```

### Module Không Được Tìm Thấy
```bash
# Xóa node_modules và cài đặt lại
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Tài Liệu Tham Khảo

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Router](https://reactrouter.com)
- [Radix UI](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Vite](https://vitejs.dev)

---

## 🤝 Đóng Góp

Để đóng góp:

1. Fork kho lưu trữ
2. Tạo chi nhánh tính năng (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add AmazingFeature'`)
4. Push sang chi nhánh (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

## 📄 Giấy Phép

Dự án này được cấp phép theo giấy phép MIT. Xem tệp `LICENSE` để biết thêm chi tiết.

---

## 👨‍💻 Tác Giả

- **Neit2108** - Quản lý dự án chính

---

## 📞 Hỗ Trợ

Có câu hỏi? Hãy tạo một issue trên [GitHub](https://github.com/Neit2108/eshop-react/issues).

---

**Chúc bạn phát triển vui vẻ! 🚀**
