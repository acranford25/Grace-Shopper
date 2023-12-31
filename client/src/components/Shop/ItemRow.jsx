import { useEffect, useState } from "react";
import AddToCart from "./AddToCart";

export default function ItemRow({ item }) {
  return (
    <div>
      <img src={item.imagereel[0].image} alt="imageNotFound" />
      <p className="text-black">{item.name}</p>
      <h4 className="text-black">${item.cost}</h4>
    </div>
  );
}
