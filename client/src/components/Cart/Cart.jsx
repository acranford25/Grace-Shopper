import { useEffect, useState } from "react";
import "../../App.css";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import AddToCart from "../Shop/AddToCart";
import RemoveCartItem from "../Shop/RemoveCartItem";
import { fetchMyCart } from "../../api/auth";
import { fetchImageByItemId } from "../../api/assets";
import { Row, Col, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { patchOrder } from "../../api/orders";

let cartImg =
  "https://em-content.zobj.net/source/microsoft-teams/363/shopping-cart_1f6d2.png";

export default function Cart() {
  const { user } = useAuth();
  const { cart, setCart } = useCart();
  const [click, setClick] = useState();
  const [setThisQuantity] = useState();
  const navigate = useNavigate();
  //sets cart items on load so that cart.items have item.order_item_id
  useEffect(() => {
    cart.userId = user.id;
    async function setCartItems() {
      const result = await fetchMyCart();
      if (result.success) {
        console.log("result: ", result);
        setCart(result.order);
        return;
      } else {
        setCart(cart);
      }
    }
    setCartItems();
  }, []);

  //re-renders totalPrice and price
  function handleClick(e) {
    e.preventDefault();
    setClick(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      async function completeOrder() {
        const result = await patchOrder(cart.id, {
          id: cart.id,
          userId: user.id,
          isCart: false,
          isComplete: true,
          date: cart.order_date,
        });
        setCart(result.order);

        navigate("/confirmation");
      }
      completeOrder();

      return;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="cart">
      <Container className="tw-grid tw-grid-cols-3 tw-gap-4">
        <div className="card tw-p-6 tw-m-6 tw-w-96 tw-shadow-layered_modern tw-col-start-2">
          <h1>Cart</h1>
          <h2> Total Price: $ {cart.totalPrice ? cart.totalPrice : 0}</h2>
        </div>
        <div className="tw-col-start-2">
          <Row>
            <Card className="scroll">
              <Col md={{ span: 10, offset: 2 }}>
                {cart.items &&
                  cart.items.map((item) => {
                    console.log("item: ", item);
                    return (
                      <div key={item.id} className="item-card">
                        <div>
                          <img src={item.image} alt="imageNotFound" />
                        </div>
                        <p>Item: {item.name}</p>
                        <p>Price: ${item.cost}</p>
                        <p>Subtotal: ${item.cost * item.quantity}</p>
                        <AddToCart
                          item={item}
                          handleClick={handleClick}
                          setThisQuantity={setThisQuantity}
                        />
                        <RemoveCartItem item={item} />
                      </div>
                    );
                  })}
              </Col>
            </Card>
          </Row>
        </div>
        <form onSubmit={handleSubmit} className="tw-col-start-2">
          <button>Complete Order</button>
        </form>
      </Container>
    </div>
  );
}
