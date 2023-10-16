import { useParams } from "react-router-dom";
import { fetchItem } from "../../api/items";
import { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SingleItem() {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const [image, setImage] = useState("");
  const [refresh, setRefresh] = useState(true);

  //runs when setItem is ran
  useEffect(() => {
    if (refresh === true) {
      //gets the item
      async function getItemById() {
        const result = await fetchItem(itemId);
        setItem(result.item);
        setImage(result.item.images[1].image);
        console.log(result.item);
      }

      getItemById();
    }
  }, [setItem]);

  return (
    <div className="container  tw-p-4 tw-m-4 tw-min-h-screen">
      <div className="card tw-bg-base-100 tw-shadow-xl tw-flex tw-flex-row">
        <figure>
          <img
            className="object-scale-down h-30 w-50"
            src={image}
            alt="imageNotFound"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-black">{item.name} </h2>
          <p className="text-black">Description: {item.description} </p>
          <p>Price: ${item.cost} </p>
          <AddToCart item={item} />
        </div>
      </div>
    </div>
  );
}
