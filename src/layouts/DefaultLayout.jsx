// src/layouts/DefaultLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function DefaultLayout() {
  return (
    <div className={cx("wrapper")}>

      <header className={cx("navbar")}>
        <div className={cx("logo")}>🛍️ MyShop</div>
        <nav className={cx("links")}>
          <Link to="/">Trang chủ</Link>
          <Link to="/cart">Giỏ hàng</Link>
          <Link to="/checkout">Thanh toán</Link>
          <Link to="/orders-history">Lịch sử đơn hàng</Link>
        </nav>
      </header>


      <main className={cx("main")}>
        <Outlet /> {}
      </main>


      <footer className={cx("footer")}>
        © 2025 MyShop. All rights reserved.
      </footer>
    </div>
  );
}
