import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import styles from "./CartPage.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

export default function CartPage() {

  const {
    carts,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const total = carts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>🛒 Giỏ hàng của bạn</h1>

      {carts.length === 0 ? (
        <p className={cx("empty")}>Giỏ hàng trống 😢</p>
      ) : (
        <>
          <div className={cx("list")}>
            {carts.map((item) => (
              <div key={item.id} className={cx("item")}>
                <img src={item.image} alt={item.title} className={cx("img")} />
                <div className={cx("info")}>
                  <h3>{item.title}</h3>
                  <p>Giá: ${item.price}</p>
                  <p>Số lượng:</p>
                  <div className={cx("quantityBox")}>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>

                  <button onClick={() => removeFromCart(item.id)}>
                    ❌ Xoá
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={cx("groupBtn")}>
            <button onClick={clearCart} className={cx("clearBtn")}>
              Xóa toàn bộ giỏ
            </button>
            <Link to={`/checkout`} className={cx("checkout")}>Tiến hành thanh toán</Link>
          </div>
        </>
      )}

      <div className={cx("summary")}>
        <h3>Tổng cộng: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
}
