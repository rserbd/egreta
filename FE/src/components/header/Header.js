import React, { useState, useEffect } from "react";
import { header } from "../../Data";
import { HiMenuAlt4, HiOutlineX } from "react-icons/hi";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import NavAccount from "./NavAccount";

const Header = ({ userRole }) => {
  const { logo_white, logo_black, cart_white, cart_black } = header;
  const [mobileNav, setMobileNav] = useState(false);
  const [isActive, setIsActive] = useState();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      id="header"
      className={`${
        isActive ? "lg:top-0 bg-black text-white" : ""
      } py-2 lg:py-4 fixed w-full transition-all z-10`}
    >
      <div className="container mx-auto flex items-center">
        <a href="/">
          <img
            className="object-scale-down h-12"
            src={isActive ? logo_white : logo_black}
            alt=""
          />
        </a>
        <div className="hidden lg:flex px-10">
          <Nav />
        </div>
        <ul className="hidden lg:flex gap-x-5 ml-auto items-center block">
          <div className="relative">
            <a href="/cart" className="block">
              <img
                className="object-scale-down h-6"
                src={isActive ? cart_white : cart_black}
                alt="cartIcon"
              />
            </a>
          </div>

          <NavAccount isActive={isActive} userRole={userRole} />
        </ul>
        <button
          className="lg:hidden ml-auto"
          onClick={() => setMobileNav(!mobileNav)}
        >
          {mobileNav ? (
            <HiOutlineX className="text-3xl text-accent" />
          ) : (
            <HiMenuAlt4 className="text-3xl text-accent" />
          )}
        </button>
        <div
          className={`${
            mobileNav ? "left-0" : "-left-full"
          } fixed top-0 bottom-0 w-[60vw] lg:hidden transition-all`}
        >
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
