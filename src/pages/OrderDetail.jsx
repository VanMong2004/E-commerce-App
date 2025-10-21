import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // cần router
import styles from "./OrderDetail.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function OrderDetail() {
  const { id } = useParams(); // Lấy order id từ url
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const foundOrder = orders.find(o => o.id === parseInt(id));
    if (foundOrder) setOrder(foundOrder);
  }, [id]);


  if (!order) return <p className={cx("empty")}>Không tìm thấy đơn hàng 😢</p>;
  
  return (
    <div className={cx("container")}>
      <button onClick={() => navigate(-1)}>⬅ Quay lại</button>
      <h1 className={cx("title")}>Chi tiết Đơn #{order.id}</h1>
      <p><b>Khách hàng:</b> {order.user.name}</p>
      <p><b>Địa chỉ:</b> {order.user.address}</p>
      <p><b>Ngày đặt:</b> {order.date}</p>
      <p><b>Trạng thái:</b> {order.status}</p>

      <h2>Sản phẩm:</h2>
      <div className={cx("items")}>
        {order.items.map(item => (
          <div key={item.id} className={cx("item")}>
            <img src={item.image} alt={item.title} />
            <span>{item.title} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <p className={cx("total")}><b>Tổng cộng:</b> ${Number(order.total).toFixed(2)}</p>
    </div>
  );
}
