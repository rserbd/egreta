import React, { useState, useEffect } from "react";
import { cartInitialState } from "../../Data";
import PopUp from "../pop-up/PopUp";
import TimePicker from "../TimePicker";

const BoatRentalForm = ({ onClose, visible }) => {
  const [optionType, setOptionType] = useState("SMALL");
  const [nrHours, setNrHours] = useState(1);
  const [price, setPrice] = useState();
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : cartInitialState;
  });

  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedMinutes, setSelectedMinutes] = useState(0);

  const increaseAmount = () => {
    if (nrHours < 10) setNrHours(nrHours + 1);
  };

  const decreaseAmount = () => {
    if (nrHours > 1) setNrHours(nrHours - 1);
  };

  const [status, setStatus] = useState(403);
  const [displayMessage, setDisplayMessage] = useState("");

  useEffect(() => {
    try {
      (async () => {
        const response = await fetch("http://localhost:8000/api/boats/price", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            optionType,
            nrHours,
          }),
        });
        const content = await response.json();
        setPrice(content);
      })();
    } catch (error) {
      console.error(error);
    }
  }, [optionType, nrHours]);

  const addToCart = (e) => {
    e.preventDefault();
    const dateInput = document.getElementById("dateInput").value;

    const updatedCart = {
      ...cart,
      boats: [
        ...cart.boats,
        {
          date: dateInput,
          fromTime: selectedHour + (selectedMinutes === 0 ? ":00" : ":30"),
          nrHours: nrHours,
          optionType: optionType,
          price: price,
        },
      ],
    };
    updatedCart.count++;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setDisplayMessage("Adăugat în coș cu succes!");
    setStatus(201);
    setShowPopUp(true);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [showPopUp, setShowPopUp] = useState(false);
  const handleOnClose = () => {
    setShowPopUp(false);
  };
  const currentDayFormatted = new Date().toISOString().split("T")[0];

  if (!visible) return null;
  else {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div
          className={`bg-white rounded p-4 mt-5 border-2 w-1/4 border-black flex flex-col justify-center items-center`}
        >
          <button className="btn btn-sm btn-outline ml-auto" onClick={onClose}>
            x
          </button>
          <p className="text-center mt-4 pretitle">Rezervă barcă</p>
          <form onSubmit={addToCart} className="flex flex-col gap-2">
            <div className="flex justify-center gap-4 p-4">
              <div className="flex flex-col justify-between gap-4 text-md text-gray-400">
                <p>Din</p>
                <p>De la</p>
                <p>Nr. ore</p>
                <p>Tip barcă</p>
              </div>
              <div className="flex flex-col items-center justify-between gap-4">
                <input
                  id="dateInput"
                  type="date"
                  required
                  min={currentDayFormatted}
                  defaultValue={currentDayFormatted}
                />
                <TimePicker
                  selectedHour={selectedHour}
                  selectedMinutes={selectedMinutes}
                  onHourChange={setSelectedHour}
                  onMinutesChange={setSelectedMinutes}
                ></TimePicker>
                <div className="flex gap-4">
                  <button type="button" onClick={() => decreaseAmount()}>
                    -
                  </button>
                  <p className="w-5 text-center">{nrHours}</p>
                  <button type="button" onClick={() => increaseAmount()}>
                    +
                  </button>
                </div>
                <div className="flex gap-4 items-center">
                  <input
                    type="checkbox"
                    checked={optionType === "SMALL"}
                    onClick={() => setOptionType("SMALL")}
                  />
                  <p>Small</p>
                  <input
                    type="checkbox"
                    checked={optionType === "LARGE"}
                    onClick={() => setOptionType("LARGE")}
                  />
                  <p>Large</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-6">
              <p className="text-sm">Small: 1-2 pers.</p>
              <p className="text-sm">Large: 4-6 pers.</p>
            </div>

            <p className="text-sm">
              * Bilet necesar pentru accesul în perimetru
            </p>
            <div className="flex justify-center items-center gap-2">
              <p className="">{price}</p>
              <p className="">RON</p>
            </div>
            <button className="btn btn-md btn-black m-auto" type="submit">
              Adaugă în coș
            </button>
          </form>
        </div>
        {showPopUp && (
          <PopUp
            onClose={handleOnClose}
            visible={showPopUp}
            displayMessage={displayMessage}
            status={status}
          ></PopUp>
        )}
      </div>
    );
  }
};

export default BoatRentalForm;
