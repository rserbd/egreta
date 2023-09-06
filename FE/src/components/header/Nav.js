import React from "react";
import { nav } from "../../Data";

const Nav = () => {
  const scrollToSection = (name) => {
    let sectionTarget;
    let offset = document.getElementById("header").offsetHeight - 50;

    switch (name) {
      case "Bilete":
        sectionTarget = document.getElementById("ticketOptionsSection");
        break;
      case "Bărci":
        sectionTarget = document.getElementById("boatRentalSection");
        break;
      case "Restaurant":
        sectionTarget = document.getElementById("restaurantSection");
        break;
      default:
        break;
    }
    window.scrollTo({
      top: sectionTarget.offsetTop - offset,
      behavior: "smooth",
    });
  };
  return (
    <nav>
      <ul className="flex gap-x-10">
        {nav.map((item, index) => {
          const { name } = item;
          return (
            <li key={index}>
              <button onClick={() => scrollToSection(name)}>{name}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
