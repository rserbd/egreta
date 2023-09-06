import React from "react";

import { nav } from "../../Data";
import NavAccount from "./NavAccount";

const MobileNav = () => {
  return (
    <div className="bg-accent/95 w-full h-full">
      <ul className="h-full flex flex-col justify-center items-center gap-y-8">
        {nav.map((item, index) => {
          const { href, name } = item;
          return (
            <li key={index}>
              <a className="link text-white text-xl" href={href}>
                {name}
              </a>
            </li>
          );
        })}
        <NavAccount />
      </ul>
    </div>
  );
};

export default MobileNav;
