import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  saveColors,
  setLoading as setColorsLoading,
  setError as setColorsError,
} from "../../store/colorsSlice";
import {
  saveBrands,
  setLoading as setBrandsLoading,
  setError as setBrandsError,
} from "../../store/brandsSlice";

import "./Aside.css";

export default function Aside({
  selectedBrand,
  setSelectedBrand,
  selectedColor,
  setSelectedColor,
}) {
  const { colors, brands } = useSelector((store) => store);
  const {
    loading: colorsLoading,
    error: colorsError,
    colors: colorsList,
  } = colors;
  const {
    loading: brandsLoading,
    error: brandsError,
    brands: brandsList,
  } = brands;

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchColors() {
      dispatch(setColorsLoading(true));
      try {
        const response = await fetch(
          "https://headphones-server.onrender.com/colors"
        );

        if (!response.ok) {
          throw new Error("Error fetching colors");
        }

        const fetchedColors = await response.json();
        dispatch(saveColors(fetchedColors));
      } catch (error) {
        dispatch(setColorsError(error.message));
      } finally {
        dispatch(setColorsLoading(false));
      }
    }

    async function fetchBrands() {
      dispatch(setBrandsLoading(true));
      dispatch(setBrandsError(null));
      try {
        const response = await fetch(
          "https://headphones-server.onrender.com/brands"
        );

        if (!response.ok) {
          throw new Error("Error fetching brands");
        }

        const fetchedBrands = await response.json();
        dispatch(saveBrands(fetchedBrands));
      } catch (error) {
        dispatch(setBrandsError(error.message));
      } finally {
        dispatch(setBrandsLoading(false));
      }
    }

    fetchColors();
    fetchBrands();
  }, [dispatch]);

  return (
    <aside>
      Aside
      <h2>Brands</h2>
      {brandsLoading && <div className='loading'>Brands loading...</div>}
      {brandsError && <div className='error'>{brandsError}</div>}
      <ul className='brands-wrapper'>
        {brandsList.map((brand, index) => (
          <li key={`${brand + index}`}>
            <input
              type='radio'
              id={brand}
              name={"brand"}
              onChange={() => setSelectedBrand(brand)}
              checked={selectedBrand === brand}
            />
            <label htmlFor={brand}>{brand}</label>
          </li>
        ))}
      </ul>
      <button onClick={() => setSelectedBrand("")}>Reset</button>
      <h2>Colors</h2>
      {colorsLoading && <div className='loading'>Colors loading...</div>}
      {colorsError && <div className='error'>{colorsError}</div>}
      <ul className='colors-wrapper'>
        {colorsList.map((color, index) => (
          <li key={`${color + index}`}>
            <button
              onClick={() => setSelectedColor(color)}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                border: "1px solid",
                backgroundColor: color,
                cursor: "pointer",
                outlineOffset: "2px",
                outline: selectedColor === color ? `1px solid red` : "",
              }}
            ></button>
          </li>
        ))}
      </ul>
      <button onClick={() => setSelectedColor("")}>Reset</button>
    </aside>
  );
}
