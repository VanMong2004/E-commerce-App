import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// Tạo context
export const CartContext = createContext();

// export const useCarts = () => useContext(CartContext);
// Tạo Provider
export function CartProvider({ children }) {
  const [carts, setCarts] = useState([]);

  // 🔹 Khi app load, lấy giỏ hàng từ localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("carts")) || [];
    setCarts(storedCart);
  }, []);

  // 🔹 Mỗi khi giỏ hàng thay đổi → lưu lại vào localStorage
  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));
  }, [carts]);

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
        return [...prev, { ...product}];
      }
    });
  };

  useEffect(() => console.log(carts)
  )

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
