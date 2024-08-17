import "./Header.css";
import Cart from "../cart/Cart";
import { Link } from "react-router-dom";

export default function Header({ sortBy, setSortBy }) {
  return (
    <header className='header'>
      <Link to='/'>LOGO</Link>

      <div className='flex-row'>
        <select
          name='price'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value=''>none</option>
          <option value='cheap'>cheap</option>
          <option value='expensive'>expensive</option>
        </select>

        <Cart />
      </div>
    </header>
  );
}
