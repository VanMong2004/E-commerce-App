import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";

const cx = classNames.bind(styles);

export default function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password);
  };

  return (
    <div className={cx("wrapper")}>
      <form onSubmit={handleSubmit} className={cx("form")}>
        <h2 className={cx("title")}>Đăng ký</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cx("input")}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={cx("input")}
        />

        <button type="submit" className={cx("button")}>Register</button>
      </form>
    </div>
  );
}
