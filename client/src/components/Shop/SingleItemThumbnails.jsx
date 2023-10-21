import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

export default function SingleItemThumbnails({ images, item }) {
  const [picCounter, setPicCounter] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(picCounter);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    setSelectedIndex(picCounter);
  }, [picCounter]);

  const nextPic = () => {
    setPicCounter(picCounter + 1);
  };

  const prevPic = () => {
    setPicCounter(picCounter - 1);
  };

  return (
    <div className="lg:tw-grid lg:tw-grid-cols-2 lg:tw-items-start lg:tw-gap-x-8 tw-p-4">
      <div className="tw-flex tw-flex-row">
        <div className="tw-place-self-center">
          {picCounter > 0 ? (
            <FaArrowAltCircleLeft className="tw-text-5xl" onClick={prevPic} />
          ) : (
            <div className="tw-p-6"></div>
          )}
        </div>
        <Tab.Group
          as="div"
          className="tw-flex tw-flex-col-reverse"
          selectedIndex={selectedIndex}
          onChange={(index) => {
            setSelectedIndex(index);
          }}
        >
          <div className="tw-mx-auto tw-mt-6 tw-hidden tw-w-full tw-max-w-2xl sm:tw-block lg:tw-max-w-none">
            <Tab.List className="tw-grid tw-grid-cols-4 tw-gap-6">
              {images.map((thisImage) => (
                <Tab
                  key={thisImage.id}
                  className="tw-relative tw-flex tw-h-24 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-md tw-bg-white tw-text-sm tw-font-medium tw-uppercase tw-text-gray-900 hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring focus:tw-ring-opacity-50 focus:tw-ring-offset-4"
                >
                  {({ selected }) => (
                    <>
                      <span className="tw-sr-only">{item.name}</span>
                      <span className="tw-absolute tw-inset-0 tw-overflow-hidden tw-rounded-md">
                        <img
                          src={thisImage.image}
                          alt=""
                          className="tw-h-full tw-w-full tw-object-cover tw-object-center"
                        />
                      </span>
                      <span
                        className={classNames(
                          selected
                            ? "tw-ring-indigo-500"
                            : "tw-ring-transparent",
                          "tw-pointer-events-none tw-absolute tw-inset-0 tw-rounded-md tw-ring-2 tw-ring-offset-2"
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </div>

          <Tab.Panels className="tw-aspect-h-1 tw-aspect-w-1 tw-w-full">
            {images.map((thisImage) => (
              <Tab.Panel key={thisImage.id}>
                <img
                  src={thisImage.image}
                  alt=""
                  className="tw-max-w-lg tw-max-h-lg tw-h-full tw-w-ull tw-object-cover tw-object-center sm:tw-rounded-lg"
                />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
        <div className="tw-place-self-center">
          {picCounter < images.length - 1 ? (
            <FaArrowAltCircleRight className="tw-text-5xl" onClick={nextPic} />
          ) : (
            <div className="tw-p-6"></div>
          )}
        </div>
      </div>
    </div>
  );
}
