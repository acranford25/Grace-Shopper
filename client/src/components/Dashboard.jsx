import React from "react";
import { useState, useEffect } from "react";
import { fetchAllItems, postItem } from "../api/items";
import ItemTable from "./ItemTable";
export default function Dashboard() {
  const [item, setItem] = useState({});
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemCost, setItemCost] = useState(0);
  const [inventory_qty, setInventory_qty] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [Table,setTable] = useState("");
  const [refresh,setRefresh] = useState(true);
  let trigger = false;

  useEffect(() => {
    async function addItem(itemObj) {
      if (trigger === true) {
        console.log("ItemObject", item);
        try {
          const newItem = await postItem(itemObj);
          console.log("newItem", newItem);
          alert(`${newItem.message}`);
          trigger = false;
          
        } catch (error) {
          throw error;
        }
      }
    }
    async function getAllItems() {
      try {
        const { items } = await fetchAllItems();
        // console.log("allItems", items);
        setAllItems(items);
        setRefresh(true);
      } catch (error) {
        throw error;
      }
    }
    
    addItem(item);
    getAllItems().then(RenderTableItems(allItems));
  }, [trigger,refresh]);

  useEffect(()=>{

    async function RenderTableItems(allItems) {
      if(refresh===true){
      setTable(<ItemTable items={allItems} setRefresh={setRefresh} />)
      console.log("table is",Table)
      setRefresh(false);
      }
    }
    RenderTableItems(allItems);
  },[allItems])

  function handleNewItem() {
    setItem({
      itemName,
      itemDescription,
      itemCost,
      itemCategory,
      inventory_qty,
      isAvailable,
    });
    console.log("clicked", item);
    trigger = true;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Items and Inventory</h2>
        <form action="">
          Add a Item
          <br />
          <label htmlFor="">
            Name:
            <input
              type="text"
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
          </label>
          <br />
          <label htmlFor="">
            description:
            <textarea
              type="text"
              onChange={(e) => {
                setItemDescription(e.target.value);
              }}
            />
          </label>
          <br />
          <label htmlFor="">
            Cost:
            <input
              type="number"
              onChange={(e) => {
                setItemCost(e.target.value);
              }}
            />
          </label>
          <br />
          <label htmlFor="">
            Category:
            <select
              name="Categories"
              value={itemCategory}
              onChange={(e) => {
                setItemCategory(e.target.value);
              }}
            >
              <option value="plush">plush</option>
              <option value="pets">pets</option>
              <option value="shoes">shoes</option>
              <option value="accessories">accessories</option>
              <option value="bedding">bedding</option>
            </select>
            {/* <input
              type="text"
              onChange={(e) => {
                setItemCategory(e.target.value);
              }}
            /> */}
          </label>
          <br />
          <label htmlFor="">
            inventory_qty:
            <input
              type="number"
              onChange={(e) => {
                setInventory_qty(e.target.value);
              }}
            />
          </label>
          <br />
          <label htmlFor="">
            Is it available:
            <input
              type="checkbox"
              onChange={(e) => {
                setIsAvailable(e.target.value);
              }}
            />
          </label>
          <br />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleNewItem();
            }}
          >
            submit
          </button>
        </form>
        {/* ///////////////////////////// */}

        {Table}
      </div>
    </div>
  );
}
