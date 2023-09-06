import React, { useState } from "react";
import { navAccount } from "../../Data";

const NavAccount = ({ isActive, userRole }) => {
  const {
    btnSignUp,
    btnLogin,
    btnLogout,
    btnAccount,
    account_black,
    account_white,
  } = navAccount;
  const [isLogged, setIsLogged] = useState(userRole ? true : false);

  const logout = async () => {
    try {
      await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <a
        className={`${isLogged ? "hidden" : ""} btn btn-sm ${
          isActive ? "lg:btn-outline-reversed" : "lg:btn-outline"
        }`}
        href={btnLogin.href}
      >
        {btnLogin.name}
      </a>
      <a
        className={`${isLogged ? "hidden" : ""} btn btn-sm ${
          isActive ? "lg:btn-outline-reversed" : "lg:btn-outline"
        }`}
        href={btnSignUp.href}
      >
        {btnSignUp.name}
      </a>
      <a
        className={`${
          isLogged ? "" : "hidden"
        } btn btn-sm text-white lg:hidden`}
        href={btnAccount.href}
      >
        {btnAccount.name}
      </a>
      <a
        className={`${isLogged ? "hidden lg:flex" : "hidden"}`}
        href={btnAccount.href}
      >
        <img
          className="object-scale-down h-6 w-5"
          src={isActive ? account_white : account_black}
          alt="accountIcon"
        />
      </a>
      <a
        href="/admin"
        className={`${
          userRole === "admin" && isLogged ? "" : "hidden"
        } btn btn-sm ${
          isActive ? "lg:btn-outline-reversed" : "lg:btn-outline"
        }`}
      >
        Admin
      </a>
      <button
        className={`${isLogged ? "" : "hidden"} btn btn-sm ${
          isActive ? "lg:btn-outline-reversed" : "lg:btn-outline"
        }`}
        onClick={async () => {
          logout();
          setIsLogged(false);
        }}
      >
        {btnLogout.name}
      </button>
    </>
  );
};

export default NavAccount;
