import { useParams } from "react-router-dom";
import { fetchItem } from "../../api/items";
import { useEffect, useState } from "react";

export default function SingleItem() {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const [image,setImage] = useState("");

  useEffect(() => {
     async function getGetItemById() {
      const result =  await fetchItem(itemId);
      console.log("result getItemById: ", result);
      setItem(result.item);
      console.log("call 1")
      await fetchImg(result.item);
    }
    async function nextFunc(item){
      console.log("call 3")
      return item.imagereel[0].image;
    }

    async function fetchImg(item){
      console.log("call 2")
      let img = await nextFunc(item)
      console.log(img)
      
      setImage(img);
      
    }

    getGetItemById();
    
    
  }, [setItem]);
  console.log("useState image",image);

  return (
    <div className="item-card">
      <p>{item.name}</p>
      <img src={image} alt="imageNotFound" />
      <p>{item.description}</p>
      <p>{item.cost}</p>
    </div>
  );
}
