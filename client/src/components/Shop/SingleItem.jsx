import { useParams } from "react-router-dom";
import { fetchItem } from "../../api/items";
import { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import "bootstrap/dist/css/bootstrap.min.css";
import CategorySidebar from "./CategorySidebar";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import SingleItemThumbnails from "./SingleItemThumbnails";

export default function SingleItem() {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [refresh, setRefresh] = useState(true);

  //runs when setItem is ran
  useEffect(() => {
    if (refresh === true) {
      //gets the item
      async function getItemById() {
        const result = await fetchItem(itemId);
        setItem(result.item);
        setImage(result.item.images[1]);
        let theseImages = [];
        for (let i = 1; i < result.item.images.length; i++) {
          theseImages.push(result.item.images[i]);
        }
        setImages(theseImages);

        console.log(result.item);
      }
      getItemById();
    }
  }, [setItem]);

  return (
    <div className="tw-container tw-grid tw-grid-cols-4 tw-grid-rows-4 tw-gap-4 tw-pt-10 tw-pl-8">
      <CategorySidebar />
      <div className="container  tw-p-4 tw-m-4 tw-min-h-screen tw-col-span-3  tw-pl-8">
        <div className="card tw-bg-base-100 tw-shadow-xl tw-flex tw-flex-row">
          <div className="tw-flex">
            <div>
              <SingleItemThumbnails images={images} item={item} />
            </div>
          </div>

          <div className="card-body">
            <h2 className="card-title text-black">{item.name} </h2>
            <p className="text-black">Description: {item.description} </p>
            <p>Price: ${item.cost} </p>
            <AddToCart item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}
