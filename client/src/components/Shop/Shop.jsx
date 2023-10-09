import { useState, useEffect } from "react";
import { fetchAllItems } from "../../api/items";
import Items from "./Items";
import CategorySidebar from "./CategorySidebar";
import { motion as m } from "framer-motion";
("../../App.css");

export default function Shop() {
  const [items, setItems] = useState([]);

  async function getItems() {
    try {
      const result = await fetchAllItems();
      setItems(result.items);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="container m-auto grid grid-cols-3 gap-4">
      <h2 className="tile-marker">Shop</h2>
      <br></br>
      <CategorySidebar />
      <Items items={items} className="m-32" />
    </div>
  );
}
