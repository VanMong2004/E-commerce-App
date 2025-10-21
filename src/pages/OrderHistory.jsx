import React, { useEffect, useState } from "react";
import styles from "./OrderHistory.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(stored);
  }, []);

  if (orders.length === 0) {
    return <p className={cx("empty")}>Bạn chưa có đơn hàng nào 😅</p>;
  }
  

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>📜 Lịch sử đơn hàng</h1>

      {orders.map((order) => (
        <div key={order.id} className={cx("orderBox")}>
          <h3>🧾 Đơn #{order.id}</h3>
          <p><b>Khách hàng:</b> {order.user.name}</p>
          <p><b>Ngày đặt:</b> {order.date}</p>
          <p><b>Tổng cộng:</b> ${order.total}</p>
          <div className={cx("items")}>
            {order.items.map((item) => (
              <div key={item.id} className={cx("item")}>
                <img src={item.image} alt={item.title} />
                <span>{item.title} × {item.quantity}</span>
              </div>
            ))}
            <Link to={`/orders/${order.id}`}>Xem chi tiết</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
