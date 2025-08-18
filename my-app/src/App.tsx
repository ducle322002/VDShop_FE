import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout';
import { HomePage, DashboardPage } from './components/pages';
import { ProductsPage, ProductDetailPage } from './features/products';
import { LoginPage, RegisterPage, ProfilePage } from './features/auth';
import { OrdersPage } from './features/orders';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/laptops" element={<ProductsPage category="laptop" />} />
              <Route path="/accessories" element={<ProductsPage category="accessory" />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
