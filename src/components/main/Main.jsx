import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError, saveProducts } from "../../store/productsSlice";
import { addItem } from "../../store/cartSlice";

import "./Main.css";

export default function Main({ sortBy, selectedBrand, selectedColor }) {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.products);
  const cart = useSelector((store) => store.cart);

  useEffect(() => {
    async function fetchProducts() {
      dispatch(setLoading(true));

      let query = "https://headphones-server.onrender.com/products";

      //`https://headphones-server.onrender.com/products?'brand_name=SoundMax'&'color_options_like=#ff0000'`

      let params = [];

      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }

      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }

      if (params.length) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await fetch(query);
        const products = await response.json();
        dispatch(saveProducts(products));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }

    fetchProducts();
  }, [selectedBrand, selectedColor]);

  const sortedProducts = [...products].sort((p1, p2) => {
    if (sortBy === "cheap") {
      return p1.price - p2.price;
    }

    if (sortBy === "expensive") {
      return p2.price - p1.price;
    }

    return 0;
  });

  function handleAdd(product) {
    dispatch(addItem(product));
  }

  return (
    <div>
      {loading && <p>Loading products...</p>}
      <ul className='products'>
        {sortedProducts.map((p) => (
          <li className='product-card' key={p.id}>
            <img src={p.image_url} alt={p.name} />
            {p.name}
            <p>
              <strong>{p.brand_name}</strong>
            </p>
            <ul className='color_options'>
              {p.color_options.map((color, index) => (
                <li
                  key={index}
                  style={{ background: color }}
                  className='color_option'
                ></li>
              ))}
            </ul>

            <p>
              <strong>{p.price}</strong>
            </p>
            <button
              onClick={() => handleAdd(p)}
              disabled={cart.some((item) => item.id === p.id)}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
