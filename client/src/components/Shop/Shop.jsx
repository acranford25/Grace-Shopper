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
    <m.div
      className="container grid grid-cols-4 gap-4"
      id="items-shop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      <CategorySidebar />
      <Items items={items} />
    </m.div>
  );
}
