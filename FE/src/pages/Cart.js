import React, { useState, useEffect } from "react";
import { cartData, cartInitialState } from "../Data";
import Footer from "../components/home/Footer";
import moment from "moment";
import PopUp from "../components/pop-up/PopUp";
import { orderPopUp } from "../Data";

const Cart = () => {
  const { img } = cartData;
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : cartInitialState;
  });
  const [status, setStatus] = useState();
  const { orderConfirmedMsg, pleaseAuth } = orderPopUp;

  const clearCartLocalStorage = () => {
    localStorage.removeItem("cart");
    setCart(cartInitialState);
  };

  const removeTicket = (index) => {
    cart.tickets.splice(index, 1);
    cart.count--;
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(JSON.parse(localStorage.getItem("cart")));
  };

  const removeBoat = (index) => {
    cart.boats.splice(index, 1);
    cart.count--;
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(JSON.parse(localStorage.getItem("cart")));
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (cart.count > 0) {
      let totalTickets = 0;
      let totalBoats = 0;
      cart.tickets?.map((ticket) => {
        return (totalTickets = totalTickets + ticket.price);
      });
      cart.boats?.map((boat) => {
        return (totalBoats = totalBoats + boat.price);
      });
      setTotalPrice(totalTickets + totalBoats);
    }
  }, [cart]);

  const [showPopUp, setShowPopUp] = useState(false);
  const handleOnClose = (e) => {
    setShowPopUp(false);
  };

  const generateOrder = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/orders/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(cart),
        }
      );
      if (response.ok) {
        clearCartLocalStorage();
      }
      setStatus(response.status);
      setShowPopUp(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen flex flex-col text-center">
      <p className="text-center title mt-10">Coș de cumpărături</p>
      <div className="flex flex-col container gap-10 m-auto">
        <div className={`${cart.count === 0 ? "hidden" : ""}`}>
          <div className="">
            <p className="mb-4 font-semibold">Bilete</p>
            <div className="flex items-center text-sm">
              <p className="w-1/6">Tip</p>
              <p className="w-1/6">Din</p>
              <p className="w-1/6">Până</p>
              <p className="w-1/6">Nr. persoane</p>
              <p className="w-1/6">Preț</p>
              <p className="w-1/6">Elimină</p>
            </div>
            <hr />
            <div className="flex flex-col mt-2 mb-5">
              {cart.tickets.length > 0 ? (
                cart.tickets.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center text-sm mb-1 text-center"
                    >
                      <p className="w-1/6">{item.optionType}</p>
                      <p className="w-1/6">
                        {moment(item.arriveDate).format("DD-MM-YYYY, dddd")}
                      </p>
                      <p className="w-1/6">
                        {moment(item.untilDate).format("DD-MM-YYYY, dddd")}
                      </p>
                      <p className="w-1/6">{item.nrPersons}</p>
                      <p className="w-1/6">{item.price} RON</p>
                      <button className="w-1/6" onClick={removeTicket}>
                        x
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col justify-between gap-10 mt-2">
                  <p className="text-center text-sm">Fără bilete selectate</p>
                </div>
              )}
            </div>
          </div>

          <div className="">
            <p className="text-center text-black py-4 font-semibold">Bărci</p>
            <div className="flex items-center text-sm text-center">
              <p className="w-1/6">Tip</p>
              <p className="w-1/6">Data</p>
              <p className="w-1/6">Începând de la</p>
              <p className="w-1/6">Nr. ore</p>
              <p className="w-1/6">Preț</p>
              <p className="w-1/6">Elimină</p>
            </div>
            <hr />
            <div className="flex flex-col mt-2">
              {cart.boats.length > 0 ? (
                cart.boats.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center text-sm mb-1 text-center"
                    >
                      <p className="w-1/6">{item.optionType}</p>
                      <p className="w-1/6">
                        {moment(item.date).format("DD-MM-YYYY, dddd")}
                      </p>
                      <p className="w-1/6">{item.fromTime}</p>
                      <p className="w-1/6">{item.nrHours}</p>
                      <p className="w-1/6">{item.price} RON</p>
                      <button className="w-1/6" onClick={removeBoat}>
                        x
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col justify-between gap-10 mt-2">
                  <p className="text-center text-sm">Fără bărci selectate</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-1/2 m-auto">
          <img
            src={img.src}
            alt={img.alt}
            className={`${cart.count > 0 ? "hidden" : ""} w-[50vh] m-auto`}
          />
          <div className="flex flex-col gap-10">
            <div
              className={`${cart.count > 0 ? "" : "hidden"} text-sm text-left`}
            >
              <p>{cart.tickets.length} x Bilete</p>
              <p>{cart?.boats?.length} x Bărci</p>
              <hr />
              <p>Preț Total: {totalPrice} RON</p>
              <hr />
            </div>

            <div className="flex justify-center items-center gap-10">
              <button
                className={`${
                  cart.count > 0 ? " " : "hidden"
                } btn btn-md btn-outline`}
                onClick={clearCartLocalStorage}
              >
                Golește coș
              </button>

              <a
                className={`${
                  cart.count > 0 ? "hidden" : ""
                } btn btn-md btn-black`}
                href="/account"
              >
                Contul Meu
              </a>

              <a className="btn btn-md btn-black" href="/">
                Înapoi Acasă
              </a>

              <button
                className={`${
                  cart.count > 0 ? " " : "hidden"
                } btn btn-md btn-black`}
                onClick={generateOrder}
              >
                Confirmă Comandă
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
      {showPopUp && (
        <PopUp
          onClose={handleOnClose}
          visible={showPopUp}
          displayMessage={status === 201 ? orderConfirmedMsg : pleaseAuth}
        ></PopUp>
      )}
    </section>
  );
};
export default Cart;
