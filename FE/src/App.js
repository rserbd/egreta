import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Admin from "./pages/Admin";

const App = () => {
  const [userRole, setUserRole] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/auth/loggedUser",
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const content = await response.json();
        return setUserRole(content.role);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (!isLoading)
    return (
      <div className="overflow-hidden bg-white">
        <Routes>
          <Route path="/" element={<Home userRole={userRole} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route
            path="/admin"
            element={
              userRole === "admin" ? <Admin /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </div>
    );
};

export default App;
