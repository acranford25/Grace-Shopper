import { Link } from "react-router-dom";

export default function CategorySidebar() {
  const categories = [
    { id: 0, name: "Guitars" },
    { id: 1, name: "Amps" },
    { id: 2, name: "Pedals" },
    { id: 3, name: "Misc." },
  ];
  return (
    <div className="tw-m-4 tw-p-2">
      <div className="tw-shadow-2xl tw-justify-evenly tw-bg-black tw-pt-6 tw-pl-6 tw-border-t-solid tw-border-t-6 tw-rounded-t-lg tw-rounded-bl-lg">
        <div className="tw-bg-[#EEAF9D] tw-pt-6 tw-pl-6 tw-border-solid tw-border-t-6 tw-border-r-1 tw-border-b-1 tw-rounded-t-lg tw-rounded-bl-lg">
          <div className="tw-bg-[#E15546] tw-pt-6 tw-pl-6 tw-border-t-2 tw-border-r-0 tw-border-b-0 tw-border-solid tw-rounded-t-lg tw-rounded-bl-lg tw-shadow-2xl">
            <div className="tw-flex tw-flex-col tw-bg-[#E7DCC9] tw-justify-evenly tw-py-2 tw-border-t-2 tw-border-r-0 tw-border-b-0 tw-border-solid tw-rounded-t-md tw-rounded-bl-md tw-shadow-xl">
              <Link
                className="card tw-bg-[#E7DCC9] tw-no-underline text-black tw-m-1 tw-py-8 hover:tw-shadow-lg"
                to={`/shop`}
              >
                All
              </Link>
              {categories.map((category) => {
                return (
                  <Link
                    className="card text-black tw-bg-[#E7DCC9] tw-no-underline tw-m-1 tw-py-8 hover:tw-shadow-lg"
                    key={category.id}
                    to={`/shop/${category.name}`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
