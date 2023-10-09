import ItemRow from "./ItemRow";
import { Link } from "react-router-dom";
import SingleItem from "./SingleItem";
import AddToCart from "./AddToCart";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function Items({ items }) {
  return (
    <div id="container">
      {items.map((item) => {
        return (
          <div key={item.id}>
            <img src={item.imagereel[0].image} alt="imageNotFound" />
            <p className="text-black">{item.name}</p>
            <p className="text-black">price: ${item.cost}</p>
            <button>
              <Link key={item.id} to={`/shop/items/${item.id}`}>
                Buy Now
              </Link>
            </button>
          </div>
        );
      })}
    </div>
  );
}
