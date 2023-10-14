import { useState, useEffect } from "react";
import { fetchAllItems } from "../../api/items";
import Items from "./Items";
import CategorySidebar from "./CategorySidebar";
import { motion as m } from "framer-motion";
("../../App.css");

export default function Shop({ categoryItems }) {
  const [items, setItems] = useState([]);

  async function getItems() {
    if (categoryItems) {
      setItems(categoryItems);
    } else {
      try {
        const result = await fetchAllItems();
        setItems(result.items);
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    getItems();
  }, [categoryItems]);

  return (
    <m.div
      className="tw-container tw-grid tw-grid-cols-4 tw-grid-rows-4 tw-gap-4"
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
