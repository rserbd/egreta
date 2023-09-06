import React from "react";
import { footer } from "../../Data";

const Footer = () => {
  const { fbImg, instaImg, ytImg } = footer;
  return (
    <section className="bg-black mt-10 min-h-[160px]">
      <div className="container m-auto flex">
        <div className="w-1/2 flex gap-10 mt-10 justify-center">
          <p className="text-white text-center">Despre</p>
          <p className="text-white text-center">Contact</p>
          <p className="text-white text-center">Legal</p>
          <p className="text-white text-center">Termeni de folosire</p>
        </div>
        <div className="w-1/2 flex justify-center gap-3 mt-10">
          <p className="text-white text-center">Follow:</p>
          <img src={fbImg} alt="" />
          <img src={instaImg} alt="" />
          <img src={ytImg} alt="" />
        </div>
      </div>
      <hr className="h-px my-4 bg-gray-200 border-0 container m-auto" />
      <p className="text-center text-white mt-6">Copyright Egreta© 2023</p>
    </section>
  );
};

export default Footer;
