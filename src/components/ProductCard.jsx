import React, { useContext } from "react";
import styles from "./ProductCard.module.scss";
import classNames from "classnames/bind";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

export default function ProductCard({ product, isOnSale }) {
  const { addToCart } = useContext(CartContext);
  // Nếu muốn, dùng class conditional
  const cardClass = cx("card", {
    sale: isOnSale, // nếu isOnSale = true → thêm class sale
    new: !isOnSale, // nếu isOnSale = false → thêm class new
  });

  return (
    <div className={cardClass}>
      <Link to={`/product-detail/${product.id}`}>
        <img src={product.image} alt={product.title} className={cx("img")} />
      </Link>
      <h3 className={cx("title")}>{product.title}</h3>
      <p className={cx("price")}>${product.price}</p>
      <button className={cx("button")} onClick={() => addToCart(product)}>
        Thêm vào giỏ
      </button>
    </div>
  );
}
