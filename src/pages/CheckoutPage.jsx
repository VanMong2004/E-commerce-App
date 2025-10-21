import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import styles from "./CheckoutPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function CheckoutPage() {
  const { carts, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const total = carts
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setForm((prev) => ({ ...prev, [name]: value }));
  //   };

  // Hàm thanh toán
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.phone) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    const orders = {
        id: Date.now(),
        items: carts,
        total,
        user: form,
        date: new Date().toLocaleString()
    }

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || []
    localStorage.setItem('orders', JSON.stringify([...existingOrders, orders]))

    toast.success("Đặt hàng thành công 🎉! Cảm ơn bạn đã mua hàng.");
    clearCart();
    setForm({ name: "", email: "", address: "", phone: "" });
  };

  if (carts.length === 0) {
    return (
      <p className={cx("empty")}>Giỏ hàng trống, không thể thanh toán 😅</p>
    );
  }

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>🧾 Thanh toán</h1>

      <div className={cx("checkoutWrapper")}>
        <div className={cx("cartSummary")}>
          <h2>Đơn hàng của bạn</h2>
          {carts.map((item) => (
            <div key={item.id} className={cx("item")}>
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <h3 className={cx("total")}>Tổng cộng: ${total}</h3>
        </div>

        <form onSubmit={handleSubmit} className={cx("form")}>
          <h2>Thông tin người nhận</h2>
          <input
            type="text"
            name="name"
            placeholder="Họ tên"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <button type="submit" className={cx("submitBtn")}>
            Xác nhận đặt hàng
          </button>
        </form>
      </div>
    </div>
  );
}
