import ItemRow from "./ItemRow";
import { Link } from "react-router-dom";
import SingleItem from "./SingleItem";
import AddToCart from "./AddToCart";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function Items({ items }) {
  return (
    <div className="col-span-3 grid grid-rows-3 grid-flow-col gap-4">
      {items.map((item) => {
        return (
          <div key={item.id} className="card m-4 p-2">
            <ItemRow key={item.id} item={item} />
            <Link key={item.id} to={`/shop/items/${item.id}`}>
              <button type="button" className="text-white bg-[#E15546]">
                Buy Now
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
