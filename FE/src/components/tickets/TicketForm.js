import React, { useState, useEffect } from "react";
import { cartInitialState, tickets } from "../../Data";
import PopUp from "../pop-up/PopUp";

const TicketForm = ({ visible, onClose, chosenOption }) => {
  const [isMultipleDays, setIsMultipleDays] = useState(true);
  const [amountTickets, setAmountTickets] = useState(1);

  const [displayMessage, setDisplayMessage] = useState();
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : cartInitialState;
  });

  const currentDayFormatted = new Date().toISOString().split("T")[0];
  const oneDay = 24 * 60 * 60 * 1000;
  const tomorrow = new Date().getTime() + oneDay;
  const [tomorrowFormatted, setTomorrowFormatted] = useState(
    new Date(tomorrow).toISOString().split("T")[0]
  );

  const [arriveDate, setArriveDate] = useState(currentDayFormatted);

  const [untilDate, setUntilDate] = useState(tomorrowFormatted);
  const [untilDateCopy, setUntilDateCopy] = useState(untilDate);

  const handleChangeDate = () => {
    const arriveInput = document.getElementById("arrive").value;
    const untilInput = document.getElementById("until").value;
    const arriveDate = new Date(arriveInput);
    let untilDate = new Date(arriveInput);

    if (isMultipleDays) {
      untilDate = new Date(untilInput);
      if (arriveDate >= untilDate) {
        untilDate = new Date(arriveDate.getTime() + oneDay);
      }
      setTomorrowFormatted(
        new Date(arriveDate.getTime() + oneDay).toISOString().split("T")[0]
      );
    }
    getPrice(arriveDate, untilDate, amountTickets);
    setArriveDate(arriveDate.toISOString().split("T")[0]);
    setUntilDate(untilDate.toISOString().split("T")[0]);
  };

  const increaseAmount = () => {
    setAmountTickets(amountTickets + 1);
    getPrice(arriveDate, untilDate, amountTickets + 1);
  };

  const decreaseAmount = () => {
    if (amountTickets > 1) {
      setAmountTickets(amountTickets - 1);
      getPrice(arriveDate, untilDate, amountTickets - 1);
    }
  };

  const addToCart = (e) => {
    e.preventDefault();
    const updatedCart = {
      ...cart,
      tickets: [
        ...cart.tickets,
        {
          optionType: tickets[chosenOption].type,
          arriveDate: arriveDate,
          untilDate: untilDate,
          nrPersons: amountTickets,
          price: price,
        },
      ],
    };
    updatedCart.count++;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setDisplayMessage("Adăugat în coș cu succes. Vă mulțumim !");
    setShowPopUp(true);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getPrice = async (arriveDate, untilDate, amountTickets) => {
    const response = await fetch("http://localhost:8000/api/tickets/price", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        optionType: tickets[chosenOption].type,
        arriveDate: arriveDate,
        untilDate: untilDate,
        nrPersons: amountTickets,
      }),
    });
    const content = await response.json();

    setPrice(content);
  };

  const [price, setPrice] = useState(tickets[chosenOption].basePrice * 2);

  const [showPopUp, setShowPopUp] = useState(false);
  const handleOnClose = () => {
    setShowPopUp(false);
  };

  if (!visible) return null;
  else {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div
          className={`bg-white rounded p-6 w-1/2 lg:w-1/3 mt-10 border-2 border-black`}
        >
          <button className="btn btn-sm btn-outline ml-auto" onClick={onClose}>
            x
          </button>
          <p className="text-center pretitle">
            Cumpără bilet {tickets[chosenOption].title}
          </p>

          <div className="flex mb-4">
            <div className="lg:w-1/2">
              <img
                src={tickets[chosenOption].src}
                alt={tickets[chosenOption].alt}
              />
            </div>
            <div className="lg:w-1/2 flex gap-4 m-auto">
              <div className="flex flex-col justify-between gap-4">
                <p className="text-md text-gray-400 mb-2">Din</p>
                <p
                  className={`${
                    !isMultipleDays ? "hidden" : "text-md text-gray-400"
                  }`}
                >
                  Până
                </p>
              </div>

              <div className="flex flex-col justify-between items-center gap-2">
                <input
                  type="date"
                  id="arrive"
                  className="mb-2"
                  required
                  defaultValue={arriveDate}
                  min={currentDayFormatted}
                  onChange={() => {
                    handleChangeDate();
                  }}
                />
                <input
                  type="date"
                  id="until"
                  className={`${!isMultipleDays ? "hidden" : ""}`}
                  required
                  defaultValue={untilDate}
                  value={untilDate}
                  min={tomorrowFormatted}
                  onChange={() => {
                    handleChangeDate();
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-4 m-auto">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="oneDay"
                  id="oneDay"
                  checked={isMultipleDays === false}
                  onClick={() => {
                    setUntilDateCopy(untilDate);
                    setUntilDate(arriveDate);
                    getPrice(arriveDate, arriveDate, amountTickets);
                    setIsMultipleDays(false);
                  }}
                />
                <label htmlFor="oneDay">O zi</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="multipleDays"
                  id="multipleDays"
                  defaultChecked
                  checked={isMultipleDays === true}
                  onClick={() => {
                    setUntilDate(untilDateCopy);
                    getPrice(arriveDate, untilDateCopy, amountTickets);
                    setIsMultipleDays(true);
                  }}
                />
                <label htmlFor="multipleDays">Mai multe zile</label>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2">
              <p className="">{price}</p>
              <p className="">RON</p>
            </div>

            <div className="flex justify-center items-center gap-10">
              <button className="btn btn-sm" onClick={decreaseAmount}>
                -
              </button>
              <p className="w-5 text-center">{amountTickets}</p>
              <button className="btn btn-sm" onClick={increaseAmount}>
                +
              </button>
            </div>
            <div className="flex gap-4">
              <form onSubmit={addToCart} id="dateForm" className="w-full">
                <button
                  className="btn btn-sm btn-black w-full disabled"
                  type="submit"
                >
                  Adaugă în coș
                </button>
              </form>
            </div>
          </div>
        </div>
        {showPopUp && (
          <PopUp
            onClose={handleOnClose}
            visible={showPopUp}
            displayMessage={displayMessage}
          ></PopUp>
        )}
      </div>
    );
  }
};

export default TicketForm;
