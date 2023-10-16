import ItemRow from "./ItemRow";
import { Link } from "react-router-dom";
import SingleItem from "./SingleItem";
import AddToCart from "./AddToCart";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function Items({ items }) {
  return (
    <div className="tw-col-span-3 tw-grid tw-grid-cols-3 tw-gap-4 tw-pl-8">
      {items.map((item) => {
        return (
          <div key={item.id} className="card tw-col-span-1 m-4 p-2">
            <ItemRow item={item} />
            <Link to={`/shop/items/${item.id}`}>
              <button type="button" className="text-white tw-bg-[#E15546]">
                Buy Now
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
