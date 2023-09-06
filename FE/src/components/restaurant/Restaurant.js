import React from "react";
import { restaurant } from "../../Data";

const Restaurant = () => {
  const { img } = restaurant;

  return (
    <section id="restaurantSection" className="min-h-[650px] py-20">
      <div className="min-h-[570px] container m-auto flex items-center gap-10">
        <div className="">
          <img src={img.src} alt={img.alt} className="m-auto w-[200vh]" />
        </div>
        <div className="p-10 border-2 border-black rounded-2xl shadow-2xl bg-gradient-to-tl from-red-300 to-orange-100">
          <p className="title text-right">
            Bucură-te de gătitul nostru tradițional
          </p>
          <div className="flex">
            <p className="m-auto text-4xl">Programări: +40 755 192 111</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Restaurant;
