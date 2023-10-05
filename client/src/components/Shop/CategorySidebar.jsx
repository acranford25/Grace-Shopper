import { Link } from "react-router-dom";

export default function CategorySidebar() {
  const categories = [
    { id: 0, name: "Guitars" },
    { id: 1, name: "Amps" },
    { id: 2, name: "Pedals" },
    { id: 3, name: "Misc." },
  ];
  return (
    <div className="sidebar">
      {categories.map((category) => {
        return (
          <Link
            className="sidebar-links text-black"
            key={category.id}
            to={`/shop/${category.name}`}
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
}
