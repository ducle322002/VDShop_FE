# VDShop Frontend - HomePage

Đây là trang chủ của ứng dụng VDShop, một trang web bán laptop và phụ kiện công nghệ.

## Tính năng

### 🏠 Hero Section
- Tiêu đề chính với gradient màu xanh
- Mô tả về dịch vụ
- Nút "Khám phá ngay" và "Liên hệ tư vấn"
- Hình ảnh hero với badge đánh giá

### 📱 Categories Section
- Hiển thị 4 danh mục chính: Laptop, Phụ kiện, Màn hình, Audio
- Mỗi danh mục có icon, tên và số lượng sản phẩm
- Hover effect với animation

### ⭐ Featured Products
- Hiển thị sản phẩm nổi bật
- Sử dụng component ProductCard
- Grid responsive từ 1-4 cột tùy theo kích thước màn hình

### ✨ Features Section
- 4 tính năng nổi bật: Giao hàng miễn phí, Bảo hành chính hãng, Hỗ trợ 24/7, Chất lượng đảm bảo
- Icon và mô tả cho mỗi tính năng

### 📧 Newsletter Section
- Form đăng ký nhận tin khuyến mãi
- Background tối với text trắng

## Cấu trúc thư mục

```
src/
├── components/
│   ├── HomePage.tsx          # Component chính của trang chủ
│   └── ProductCard.tsx       # Component hiển thị sản phẩm
├── data/
│   └── mockData.ts           # Dữ liệu mẫu sản phẩm
├── types/
│   └── index.ts              # Định nghĩa TypeScript interfaces
├── App.tsx                   # Component chính của ứng dụng
└── index.css                 # CSS tùy chỉnh với responsive design
```

## Cài đặt và chạy

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy ứng dụng:
```bash
npm start
```

3. Mở trình duyệt và truy cập: `http://localhost:3000`

## Dependencies

- **React**: Framework chính
- **TypeScript**: Ngôn ngữ lập trình
- **Lucide React**: Icon library

## Props của HomePage

```typescript
interface HomePageProps {
  onNavigate: (page: string) => void;      // Callback khi navigate
  onViewProduct: (product: Product) => void; // Callback khi xem sản phẩm
}
```

## Styling

Ứng dụng sử dụng **CSS thuần** với:
- CSS Grid và Flexbox cho layout
- CSS transitions và transforms cho animations
- Media queries cho responsive design
- CSS custom properties cho màu sắc và spacing
- Hover effects và interactive elements

## Responsive Design

- **Mobile**: 1 cột cho sản phẩm, 2 cột cho danh mục
- **Tablet**: 2 cột cho sản phẩm, 4 cột cho danh mục
- **Desktop**: 3-4 cột cho sản phẩm, 4 cột cho danh mục

## Customization

Bạn có thể dễ dàng tùy chỉnh:
- Màu sắc trong file `index.css`
- Dữ liệu sản phẩm trong `mockData.ts`
- Layout và styling trong các CSS classes
- Icons từ Lucide React library

## Tương lai

Có thể mở rộng thêm:
- Trang chi tiết sản phẩm
- Trang danh sách sản phẩm
- Trang giỏ hàng
- Trang thanh toán
- Trang quản lý tài khoản
