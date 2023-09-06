import React, { useState } from "react";
import { boatRental } from "../../Data";
import BoatRentalForm from "./BoatRentalForm";

const BoatRental = () => {
  const { img, bg } = boatRental;
  const [showForm, setShowForm] = useState(false);

  const handleOnClose = (e) => {
    setShowForm(false);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    setShowForm(true);
  };

  return (
    <section id="boatRentalSection" className="min-h-[650px] py-20">
      <div className="min-h-[570px] container m-auto flex items-center">
        <div
          className={`p-10 border-2 border-black rounded-2xl shadow-2xl ${bg}`}
        >
          <p className="title text-left">Devin-o căpitanul unei bărci</p>
          <button
            className="btn btn-lg btn-accent mr-auto"
            onClick={(e) => handleOnClick(e)}
          >
            Rezervă Barcă
          </button>
        </div>
        <div className="">
          <img src={img.src} alt={img.alt} className="m-auto w-[300vh]" />
        </div>
      </div>

      {showForm && (
        <BoatRentalForm
          onClose={handleOnClose}
          visible={showForm}
        ></BoatRentalForm>
      )}
    </section>
  );
};

export default BoatRental;
