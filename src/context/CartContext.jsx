import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
// Tạo context
export const CartContext = createContext();

// Tạo Provider
export function CartProvider({ children }) {
  const { user } = useAuth();
  const [carts, setCarts] = useState([]);

  // 🔹 Khi user đổi hoặc app load, lấy giỏ hàng đúng của user đó
  useEffect(() => {
    if (!user) {
      setCarts([]); // nếu chưa đăng nhập thì giỏ hàng trống
      return;
    }
    const key = `carts_${user.email}`;
    const storedCart = JSON.parse(localStorage.getItem(key)) || [];
    setCarts(storedCart);
  }, [user]);

  // 🔹 Khi giỏ hàng thay đổi thì lưu lại theo user hiện tại
  useEffect(() => {
    if (!user) return;
    const key = `carts_${user.email}`;
    localStorage.setItem(key, JSON.stringify(carts));
  }, [carts, user]);

  // Hàm thêm vào giỏ hàng
  const addToCart = (product) => {
    setCarts((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        toast.info(`🔁 Đã tăng số lượng "${product.title}"`);
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`✅ Đã thêm "${product.title}" vào giỏ hàng`);
        return [...prev, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  // Hàm tằng số lượng
  const increaseQuantity = (id) => {
    setCarts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Hàm giảm số lượng
  const decreaseQuantity = (id) => {
    setCarts((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Hàm xoá 1 sản phẩm
  const removeFromCart = (id) => {
    setCarts((prev) => prev.filter((item) => item.id !== id));
    toast.error("🗑️ Đã xoá sản phẩm khỏi giỏ");
  };

  // Hàm xóa toàn bộ giỏ
  const clearCart = () => {
    setCarts([]);
    toast.warn("🧹 Giỏ hàng đã được làm trống");
  };

  return (
    <CartContext.Provider
      value={{
        carts,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// export const useCarts = () => useContext(CartContext);
