import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import styles from "./ProductDetail.module.scss";
import classNames from "classnames/bind";
import axios from "axios";

const cx = classNames.bind(styles);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    navigate("/cart");
  };

  return (
    <div className={cx("wrapper")}>
      <img className={cx("image")} src={product.image} alt={product.name} />
      <div className={cx("info")}>
        <h2 className={cx("name")}>{product.name}</h2>
        <p className={cx("price")}>${Number(product.price).toFixed(2)}</p>
        <p className={cx("description")}>{product.description}</p>

        <div className={cx("quantity")}>
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)}>+</button>
        </div>

        <button className={cx("addButton")} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
