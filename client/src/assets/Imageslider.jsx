import { SliderData } from "./SliderData";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

export const Imageslider = ({ slides }) => {
  const nav = useNavigate();
  const [pic, setPic] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const timeout = setTimeout(() => setPic((pic + 1 + length) % length), 4500);
    return () => clearTimeout(timeout);
  }, [pic, length]);
  const nextSlide = () => {
    setPic(pic === length - 1 ? 0 : pic + 1);
  };

  const prevSlide = () => {
    setPic(pic === 0 ? length - 1 : pic - 1);
  };

  if (!Array.isArray(slides) || length <= 0) {
    return null;
  }

  return (
    <figure className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {SliderData.map((slide, id) => {
        return (
          <div className={id === pic ? "slide active" : "slide"} key={id}>
            {id === pic && (
              <a>
                <img src={slide.image} key={id} alt="comfy" className="image" />
              </a>
            )}
          </div>
        );
      })}
    </figure>
  );
};
