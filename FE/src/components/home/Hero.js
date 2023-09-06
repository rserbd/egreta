import React from "react";
import { hero } from "../../Data";

const Hero = () => {
  const { title, subtitle, image } = hero;
  return (
    <section id="heroSection" className="min-h-[750px] py-10">
      <div className="container mx-auto min-h-[750px] flex justify-center items-center">
        <div className="flex flex-col lg:gap-x-[30px] gap-y-8 lg:gap-y-0 lg:flex-row items-center justify-center text-center lg:text-left">
          <div className="flex-1">
            <h1 className="title mb-2 lg:mb-5">{title}</h1>
            <p className="lead mb-5 lg:mb-10">{subtitle}</p>
          </div>
          <div className="flex-1">
            <img src={image} alt="" className="m-auto w-[128vh]" />
          </div>
        </div>
        <img src="" alt="" />
      </div>
    </section>
  );
};

export default Hero;
