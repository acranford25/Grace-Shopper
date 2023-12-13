import { buildSlideshow } from "../lib/SliderData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect } from "react";

export default function Imageslider() {
  const nav = useNavigate();
  const [pic, setPic] = useState(1);
  const [slidRight, setSlidRight] = useState(false);
  const [slidLeft, setSlidLeft] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getUrls() {
      const urlArr = await buildSlideshow();
      setImages(urlArr);
    }
    getUrls();
  }, []);

  async function moveRight() {
    let firstPic = await images.pop();
    await images.unshift(firstPic);
    await setImages(images);
    await setSlidRight(false);
    await setIsVisible(true);
  }

  const nextSlide = () => {
    setSlidLeft(true);
    setIsVisible(false);
  };

  const prevSlide = () => {
    setSlidRight(true);
    setIsVisible(false);
  };

  async function moveLeft() {
    let lastPic = await images.shift();
    await images.push(lastPic);
    await setImages(images);
    await setSlidLeft(false);
    await setIsVisible(true);
  }

  function reset() {
    setTimeout(() => {
      (slidLeft ? moveLeft() : undefined) ||
        (slidRight ? moveRight() : undefined);
    }, [500]);
  }

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <div className="slider">
      <FaChevronLeft
        className="left-arrow tw-z-50 tw-rounded-full tw-text-gray-300 tw-border-black tw-shadow-level_3 hover:tw-shadow-level_4"
        onClick={nextSlide}
      />

      <FaChevronRight
        className="right-arrow tw-z-50 tw-rounded-full tw-text-gray-300 tw-shadow-level_3 hover:tw-shadow-level_4"
        onClick={prevSlide}
      />
      <div
        className="tw-flex tw-flex-row tw-py-4 tw-transition-all"
        onChange={reset()}
      >
        {images.map((image, id) => {
          const endItem = [
            slidLeft || slidRight
              ? "image tw-z-0 tw-block tw-shadow-bl tw-absolute hover:tw-shadow-2bl tw-overflow-hidden tw-visible"
              : "image tw-z-20 tw-block tw-absolute hover:tw-shadow-2bl tw-overflow-hidden tw-invisible",
          ];

          const firstItem = [
            (slidLeft &&
              "image tw-z-30 tw-block tw-relative hover:tw-shadow-2bl tw-overflow-hidden") ||
              (slidRight
                ? "image tw-z-30 tw-block tw-shadow-bl tw-relative hover:tw-shadow-2bl tw-stw-overflow-hidden tw-transform-gpu tw-translate-x-[30.75em] tw-duration-300 tw-ease-linear"
                : "image tw-z-30 tw-block tw-shadow-bl tw-relative hover:tw-shadow-2bl tw-overflow-hidden"),
          ];

          const lastItem = [
            (slidRight &&
              "image tw-z-30 tw-block tw-relative hover:tw-shadow-2bl tw-overflow-hidden") ||
              (slidLeft
                ? "image tw-z-30 tw-block tw-shadow-bl tw-relative hover:tw-shadow-2bl tw-overflow-hidden tw-transform-gpu tw--translate-x-[30.75em] tw-duration-300 tw-ease-linear"
                : "image tw-z-30 tw-block tw-shadow-bl tw-relative hover:tw-shadow-2bl tw-overflow-hidden"),
          ];

          const middleItem = [
            (slidRight &&
              "image tw-z-40 tw-block tw-relative hover:tw-shadow-2bl tw-overflow-hidden tw-transform-gpu tw-translate-x-[30.75em] tw-duration-300 tw-ease-linear") ||
              (slidLeft
                ? "image tw-z-40 tw-block tw-relative hover:tw-shadow-2bl tw-overflow-hidden tw-transform-gpu tw--translate-x-[30.75em] tw-duration-300 tw-ease-linear"
                : "image tw-z-40 tw-block tw-shadow-bl tw-relative hover:tw-shadow-2bl tw-overflow-hidden"),
          ];

          return (
            <div className="tw-py-6 hover:tw-pt-5 tw-tran">
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  nav(`/shop/items/${images[2].itemid}`);
                }}
              >
                {id === pic && (
                  <div className=" tw-duration-700 tw-ease-in-out">
                    <img
                      src={images[1].image}
                      key={id}
                      alt=""
                      className={endItem}
                    />
                  </div>
                )}
                {id === pic + 1 && (
                  <div>
                    <img
                      src={images[2].image}
                      key={id + 1}
                      alt=""
                      className={firstItem}
                    />
                  </div>
                )}
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  nav(`/shop/items/${images[3].itemid}`);
                }}
              >
                {id === pic + 2 && (
                  <div className="tw-px-8">
                    <img
                      src={images[3].image}
                      key={id + 2}
                      alt=""
                      className={middleItem}
                    />
                  </div>
                )}
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  nav(`/shop/items/${images[4].itemid}`);
                }}
              >
                {id === pic + 3 && (
                  <div>
                    <img
                      src={images[5].image}
                      key={id + 3}
                      alt=""
                      className={endItem}
                    />
                  </div>
                )}
                {id === pic + 4 && (
                  <div>
                    <img
                      src={images[4].image}
                      key={id + 4}
                      alt=""
                      className={lastItem}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
