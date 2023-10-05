import { useEffect, useState } from "react";
import AddToCart from "./AddToCart";

export default function ItemRow({ item }) {
  return (
    <divs>
      <img src={item.imagereel[0].image} alt="imageNotFound" />
      <p className="text-black">{item.name}</p>
      <p className="text-black">{item.description}</p>
      <p className="text-black">price: ${item.cost}</p>
    </divs>
  );
}
