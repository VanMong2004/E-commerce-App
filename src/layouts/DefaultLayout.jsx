// src/layouts/DefaultLayout.jsx
import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import { useAuth } from "../context/AuthContext";

const cx = classNames.bind(styles);

export default function DefaultLayout() {
    const { user, logout } = useAuth();


  return (
    <div className={cx("wrapper")}>
      <header className={cx("navbar")}>
        <div className={cx("logo")}>🛍️ MyShop</div>
        <nav className={cx("links")}>
          <Link to="/">Trang chủ</Link>
          <Link to="/cart">Giỏ hàng</Link>
          <Link to="/checkout">Thanh toán</Link>
          <Link to="/orders-history">Lịch sử đơn hàng</Link>
          {user 
          ? ( 
            <>
              <span>{user.email}</span>
              <button onClick={logout}>Log out</button>
            </>
          )
          : (
           <>
              <Link to="/register">Đăng ký</Link>
              <Link to="/login">Đăng nhập</Link>
           </>
          )
          }
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
