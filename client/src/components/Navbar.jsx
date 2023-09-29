import { useNavigate } from "react-router";
import { logout } from "../api/auth";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();
  const { user, setLoggedIn } = useAuth();
  const { setCart, cart, isCounted } = useCart();

  const [count, setCount] = useState(0);
  async function handleLogout() {
    await logout();

    cart.id = 0;
    setCart(cart);
    setLoggedIn(false);
    nav("/");
  }
  useEffect(() => {
    function resetTop() {
      if (nav) {
        window.scrollTo(0, 0);
      }
    }
    return resetTop();
  }, [nav]);

  useEffect(() => {
    if (cart.items) {
      setCount(cart.items.length);
    } else {
      setCount(0);
    }
  }, [isCounted, cart]);

  return (
    <div id="navbar" className="navbar">
      <h1 className="nav-header">Vintage Modern Music</h1>
      <div className="navlinks">
        <Link to="/" className="link">
          Home
        </Link>
        {user.isGuest ? (
          <Link to="/login" className="link">
            Login/Register
          </Link>
        ) : (
          <li>
            <button className="link" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
        {user.isAdmin ? (
          <>
            <Link to="/dashboard/profile" className="link">
              Profile
            </Link>
            <Link to="/dashboard" className="link">
              Dashboard
            </Link>
          </>
        ) : (
          <Link to="/dashboard/profile" className="link">
            Profile
          </Link>
        )}
        <Link to="/shop" className="shop-navlinks">
          Shop
        </Link>
        <Link to="/cart" className="navlinks">
          <p className="counter">{count}</p>
          <img
            src="https://em-content.zobj.net/source/microsoft-teams/363/shopping-cart_1f6d2.png"
            style={{ width: "30px", height: "40px" }}
          />
        </Link>
      </div>
    </div>
  );
}
