import { buildSlideshow } from "../lib/SliderData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useEffect } from "react";
export default function Imageslider() {
  const nav = useNavigate();
  const [pic, setPic] = useState(1);
  const [firstImage, setFirstImage] = useState();
  const [secondImage, setSecondImage] = useState();
  const [thirdImage, setThirdImage] = useState();
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    async function getUrls() {
      const urlArr = await buildSlideshow();
      setSliderData(urlArr);
      console.log("sliderData: ", urlArr);
    }
    getUrls();
  }, []);

  useEffect(() => {
    async function getImages() {
      await setSecondImage(sliderData[1].image);
      await setFirstImage(sliderData[0].image);
      await setThirdImage(sliderData[2].image);
    }
    getImages();
  }, [pic, sliderData]);

  // const nextSlide = () => {
  //   setPic(pic === sliderData.length - 1 ? 0 : pic + 1);
  // };

  const nextSlide = () => {
    let lastPic = sliderData.pop();
    sliderData.unshift(lastPic);
    setSliderData(sliderData);
    setPic(pic + 1);
  };

  // const prevSlide = () => {
  //   setPic(pic === 0 ? sliderData.length - 1 : pic - 1);
  // };

  const prevSlide = () => {
    let firstPic = sliderData.shift();
    sliderData.push(firstPic);
    setPic(pic - 1);
  };

  if (!Array.isArray(sliderData) || sliderData.length <= 0) {
    return null;
  }

  return (
    <figure className="slider">
      <FaArrowAltCircleLeft
        className="left-arrow hover:tw-text-slate-500"
        onClick={nextSlide}
      />
      <FaArrowAltCircleRight
        className="right-arrow hover:tw-text-slate-500"
        onClick={prevSlide}
      />
      <div className="tw-flex tw-flex-row tw-py-4">
        <div
          className="tw-p-6"
          style={{ cursor: "pointer" }}
          onClick={() => {
            nav(`/shop/items/${sliderData[0].itemid}`);
          }}
        >
          <img
            src={firstImage}
            alt="image"
            className="image tw-transition tw-delay-300 tw-ease-in-out tw-duration-300 hover:tw-shadow-2xl"
          />
        </div>

        <div
          className="tw-p-6"
          style={{ cursor: "pointer" }}
          onClick={() => {
            nav(`/shop/items/${sliderData[1].itemid}`);
          }}
        >
          <img
            src={secondImage}
            alt="image"
            className="image hover:tw-shadow-2xl"
          />
        </div>
        <div
          className="tw-p-6"
          style={{ cursor: "pointer" }}
          onClick={() => {
            nav(`/shop/items/${sliderData[2].itemid}`);
          }}
        >
          <img
            src={thirdImage}
            alt="image"
            className="image tw-duration-200 tw-ease-linear hover:tw-shadow-2xl"
          />
        </div>
      </div>
    </figure>
  );
}
