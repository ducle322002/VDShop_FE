# VDShop - Cấu trúc dự án

## Tổng quan
Dự án VDShop được tổ chức theo kiến trúc Feature-based với cấu trúc rõ ràng, dễ bảo trì và mở rộng.

## Cấu trúc thư mục

```
src/
├── assets/                 # Hình ảnh, fonts, icons
├── components/            # Components tái sử dụng
│   ├── common/           # Components dùng chung (Button, Input, Modal, etc.)
│   ├── forms/            # Components form
│   ├── layout/           # Components layout (Header, Footer, Sidebar, etc.)
│   └── ui/               # UI components cơ bản
├── features/             # Tính năng theo module
│   ├── auth/            # Module xác thực (Login, Register, Profile)
│   ├── products/        # Module sản phẩm (Product list, detail, search)
│   ├── cart/            # Module giỏ hàng
│   └── orders/          # Module đơn hàng
├── pages/               # Các trang chính
├── hooks/               # Custom hooks
├── services/            # API services
├── utils/               # Utility functions
├── constants/           # Constants và config
├── types/               # TypeScript types
├── contexts/            # React contexts
├── styles/              # Global styles
└── config/              # App configuration
```

## Mô tả chi tiết

### 1. Features (Tính năng)
Mỗi feature module chứa:
- Components liên quan đến tính năng
- Types và interfaces
- Logic nghiệp vụ
- File index.ts để export

#### Auth Module
- Quản lý đăng nhập/đăng ký
- Quản lý profile người dùng
- Xác thực và phân quyền

#### Products Module
- Hiển thị danh sách sản phẩm
- Chi tiết sản phẩm
- Tìm kiếm và lọc
- Quản lý danh mục

#### Cart Module
- Quản lý giỏ hàng
- Thêm/xóa/cập nhật sản phẩm
- Tính toán giá
- Mã giảm giá

#### Orders Module
- Tạo đơn hàng
- Theo dõi trạng thái
- Lịch sử đơn hàng
- Quản lý hoàn tiền

### 2. Components
#### Common Components
- **Button**: Nút với nhiều variant và size
- **Input**: Input field với validation
- **Modal**: Modal popup
- **Loading**: Loading spinner
- **ErrorBoundary**: Xử lý lỗi

#### Layout Components
- **Header**: Header chính với navigation
- **Footer**: Footer với links và thông tin
- **Sidebar**: Sidebar navigation
- **MainLayout**: Layout chính
- **PageContainer**: Container cho các trang

### 3. Services
- **api**: Axios instance với interceptors
- **authService**: Xử lý authentication
- **productService**: Quản lý sản phẩm
- **cartService**: Quản lý giỏ hàng
- **orderService**: Quản lý đơn hàng

### 4. Hooks
- **useAuth**: Quản lý trạng thái authentication
- **useCart**: Quản lý giỏ hàng
- **useLocalStorage**: Lưu trữ local storage
- **useDebounce**: Debounce cho search

### 5. Contexts
- **AuthContext**: Context cho authentication
- **CartContext**: Context cho giỏ hàng

## Quy tắc đặt tên

### Files
- Components: PascalCase (Button.tsx, ProductCard.tsx)
- Hooks: camelCase với prefix "use" (useAuth.ts, useCart.ts)
- Services: camelCase với suffix "Service" (authService.ts)
- Types: PascalCase (User.ts, Product.ts)

### Folders
- Features: lowercase (auth/, products/)
- Components: lowercase (common/, layout/)
- Services: lowercase (services/)

## Cách sử dụng

### Import components
```typescript
import { Button, Input } from '@/components/common';
import { ProductCard } from '@/features/products';
import { MainLayout } from '@/components/layout';
```

### Import services
```typescript
import { authService, productService } from '@/services';
```

### Import hooks
```typescript
import { useAuth, useCart } from '@/hooks';
```

## Lợi ích của cấu trúc này

1. **Tách biệt rõ ràng**: Mỗi feature có thư mục riêng
2. **Dễ bảo trì**: Code được tổ chức logic
3. **Dễ mở rộng**: Thêm feature mới dễ dàng
4. **Tái sử dụng**: Components có thể dùng chung
5. **Type safety**: TypeScript types được định nghĩa rõ ràng
6. **Testing**: Dễ dàng viết test cho từng module

## Hướng dẫn phát triển

### Thêm feature mới
1. Tạo thư mục trong `src/features/`
2. Tạo components, types, và logic
3. Export trong file `index.ts`
4. Cập nhật main index

### Thêm component mới
1. Tạo file component trong thư mục phù hợp
2. Export trong file `index.ts` của thư mục
3. Sử dụng trong các components khác

### Thêm service mới
1. Tạo file service trong `src/services/`
2. Implement các methods cần thiết
3. Export trong `src/services/index.ts`
4. Sử dụng trong components hoặc hooks
