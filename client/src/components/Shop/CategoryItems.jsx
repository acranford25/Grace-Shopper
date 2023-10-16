import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Items from "./Items";
import { fetchItemsByCategory } from "../../api/items";
import Shop from "./Shop";
("../../App.css");
export default function CategoryItems() {
  const { category } = useParams();
  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    async function getItems() {
      const result = await fetchItemsByCategory(category);

      setCategoryItems(result);
    }
    getItems();
  }, [category]);

  return (
    <div>
      <Shop categoryItems={categoryItems} setCategoryItems={setCategoryItems} />
    </div>
  );
}
