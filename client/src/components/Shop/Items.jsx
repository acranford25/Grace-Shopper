import ItemRow from "./ItemRow";
import { Link } from "react-router-dom";
import SingleItem from "./SingleItem";
import AddToCart from "./AddToCart";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Items({ items }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => {
        return (
          <div key={item.id} className="cards">
            <Link key={item.id} to={`/shop/items/${item.id}`}>
              <ItemRow key={item.id} item={item} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
