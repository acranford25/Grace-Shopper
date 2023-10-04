import ItemRow from "./ItemRow";
import { Link } from "react-router-dom";
import SingleItem from "./SingleItem";
import AddToCart from "./AddToCart";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Items({ items }) {
  return (
    <div>
      <div className="flex flex-col justify-center min-h-screen bg-slate-100 gap-5">
        <div className="flex flex-col justify-center min-h-screen bg-slate-100 gap-5">
          <div className="columns-5 container mx-auto px-4">
            {items.map((item) => {
              return (
                <div
                  key={item.id}
                  className="card w-92 overflow-auto bg-base-100 shadow-xl"
                >
                  <Link key={item.id} to={`/shop/items/${item.id}`}>
                    <ItemRow key={item.id} item={item} />
                  </Link>
                  <AddToCart item={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
