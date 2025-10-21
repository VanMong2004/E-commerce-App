import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));

    axios.get("https://fakestoreapi.com/products/categories")
    .then(res => setCategories(res.data))
    .catch(err => console.error(err));
  }, []);

  const filteredProducts = selectedCategory === "all"
  ? products
  : products.filter(p => p.category === selectedCategory);


  return (
     <div className={cx("container")}>
      <h1 className={cx("title")}>Danh sách sản phẩm</h1>

      <div className={cx("categoryBtns")}>
        <button
          onClick={() => setSelectedCategory("all")}
          className={cx({ active: selectedCategory === "all" })}
        >
          Tất cả
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cx({ active: selectedCategory === cat })}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={cx("products")}>
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isOnSale={product.id % 2 === 0} // Giả sử sản phẩm có id chẵn là đang giảm giá
          />
        ))}
      </div>
    </div>
  );
}

export default Home;