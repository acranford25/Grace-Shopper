import { useState } from "react";
import { registerUser, login, fetchMyCart } from "../api/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postOrder } from "../api/orders";
import { postOrderItem, patchOrderItem } from "../api/order_items";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

export default function AuthForm() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, setUser, setLoggedIn } = useAuth();
  const { cart, setCart, setOrderId } = useCart();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let result;
      if (pathname === "/register") {
        result = await registerUser(username, password);
      } else {
        result = await login(username, password);
      }

      let userId = result.user.id;
      let orderId;
      let thisCart = {};
      result.success
        ? (alert(result.message),
          setLoggedIn(true),
          setUser(result.user),
          updateCart(),
          setUsername(""),
          setPassword(""),
          navigate("/"))
        : alert(result.message);

      async function updateCart() {
        if (cart.id && cart.isCart) {
          const haveCart = await fetchMyCart();
          if (haveCart.success) {
            //setOrderId(haveCart.order.id);
            orderId = haveCart.order.id;
            setOrderId(orderId);
            thisCart = haveCart.order;
          } else {
            const result2 = await postOrder(userId);
            console.log("result2 from postOrder", result2);
            //setOrderId(result2.order.id);
            orderId = result2.order.id;
            setOrderId(orderId);
          }

          for (let item of cart.items) {
            if (thisCart.items) {
              let found = thisCart.items.find(
                (thisItem) => thisItem.id === item.id
              );
              if (found) {
                for (let thatItem of thisCart.items) {
                  if (item.id === thatItem.id) {
                    thatItem.quantity += item.quantity;
                    thatItem.subtotal += item.subtotal;
                    async function updateOrderItem() {
                      console.log("thatItem", thatItem);
                      console.log("thisCart", thisCart);
                      const result = await patchOrderItem(
                        thatItem.order_item_id,
                        thisCart.id,
                        thatItem.id,
                        thatItem.quantity
                      );
                      setOrderId(thisCart.id);
                      return result;
                    }
                    updateOrderItem();
                    setCart(cart);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    return;
                  }
                }
              }
            } else {
              async function postPostOrderItem() {
                try {
                  const orderItem = await postOrderItem(
                    orderId,
                    item.id,
                    item.quantity
                  );
                  return orderItem;
                } catch (error) {
                  console.error(error);
                }
              }
              postPostOrderItem();
              return;
            }
          }
        }
      }
    } catch (error) {
      setError(result.message);
    }
  }

  return (
    <div className="login">
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        {pathname === "/register" ? <h2>Register</h2> : <h2>Login</h2>}
        <br></br>
        <label>Username: </label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password: </label>
        {showPassword ? (
          <input
            type="text"
            placeholder="Password"
            name="password"
            id="typepass"
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : (
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="typepass"
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <div>
          <input
            type="checkbox"
            onChange={(e) => setShowPassword(!showPassword)}
          />
          Show Password
        </div>
        <br></br>
        <button>Submit</button>
        <br></br>
        {pathname === "/register" ? (
          <p>
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        ) : (
          <p>
            Don't have an account? <Link to="/register">Register Here</Link>
          </p>
        )}
      </form>
    </div>
  );
}
