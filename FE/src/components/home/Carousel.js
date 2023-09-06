import React, { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { carousel, dots } from "../../Data";

const Carousel = () => {
  const [slide, setSlide] = useState(0);
  const changeSlideForward = () => {
    setSlide((slide + 1) % carousel.length);
  };
  const changeSlideBack = () => {
    if (slide === 0) {
      setSlide(carousel.length - 1);
    } else {
      setSlide((slide - 1) % carousel.length);
    }
  };
  const descriptionRows = carousel[slide].description.split(". ");

  return (
    <section className="mb-10 py-5">
      <div className="container mx-auto lg:flex ">
        <div>
          <div className="container flex items-center">
            <button
              className="btn btn-sm lg:btn-md mr-3"
              onClick={changeSlideBack}
            >
              <HiOutlineChevronLeft />
            </button>
            <div className="m-auto mt-4 mb-4">
              <img
                className="text-center h-[24rem] w-[35rem] rounded-2xl"
                src={carousel[slide].src}
                alt={carousel[slide].alt}
              />
            </div>
            <button
              className="btn btn-sm lg:btn-md ml-3"
              onClick={changeSlideForward}
            >
              <HiOutlineChevronRight />
            </button>
          </div>
          <div className="flex gap-4 justify-center mb-4 py-2">
            <div>
              <img
                src={slide === 0 ? dots[0].src : dots[1].src}
                alt={dots[0].alt}
                className="w-4 h-4 lg:w-6 lg:h-6"
              />
            </div>
            <div>
              <img
                src={slide === 1 ? dots[0].src : dots[1].src}
                alt={dots[0].alt}
                className="w-4 h-4 lg:w-6 lg:h-6"
              />
            </div>
            <div>
              <img
                src={slide === 2 ? dots[0].src : dots[1].src}
                alt={dots[0].alt}
                className="w-4 h-4 lg:w-6 lg:h-6"
              />
            </div>
          </div>
        </div>

        <div className="m-auto w-[30vh]">
          {descriptionRows.map((row, index) => {
            return (
              <p key={index} className="lead">
                {row}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
