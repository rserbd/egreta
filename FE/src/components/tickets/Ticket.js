import React, { useState } from "react";
import { ticketOptions, tickets } from "../../Data";
import TicketForm from "./TicketForm";
const { check } = ticketOptions;

const Ticket = () => {
  const [showForm, setShowForm] = useState(false);
  const [chosenOption, setChosenOption] = useState();

  const handleOnClose = (e) => {
    setShowForm(false);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    setChosenOption(e.target.id);
    setShowForm(true);
  };

  return (
    <section>
      <ul className="lg:flex gap-10 p-2 justify-center">
        {tickets.map((item, indexTickets) => {
          const { title, description, smallDescription, src, alt, bg } = item;
          const perks = description.split(". ");
          return (
            <div
              key={indexTickets}
              className={`${bg} w-full lg:w-1/3 shadow-2xl rounded-2xl border-2 border-black`}
            >
              <div className="mb-4 flex justify-center h-full">
                <div className="flex flex-col justify-between p-4">
                  <p className="text-center h2 text-md">{title}</p>
                  <img src={src} alt={alt} className="m-auto" />
                  <div className="p-2 flex-grow mb-4">
                    {perks.map((perk, index) => {
                      return (
                        <div key={index} className="flex">
                          <img
                            src={check}
                            alt="checkIcon"
                            className="h-[2vh] mt-2 mr-2"
                          />{" "}
                          <p key={index}>{perk}.</p>
                        </div>
                      );
                    })}
                    <p
                      className={
                        indexTickets === 0
                          ? "text-sm text-center my-2"
                          : "hidden"
                      }
                    >
                      {smallDescription}
                    </p>
                  </div>

                  <button
                    id={indexTickets}
                    className="btn btn-sm btn-accent m-auto shadow-xl"
                    onClick={(e) => handleOnClick(e)}
                  >
                    Vezi mai multe
                  </button>
                </div>
              </div>
              {showForm && chosenOption === indexTickets.toString() && (
                <TicketForm
                  onClose={handleOnClose}
                  visible={showForm}
                  chosenOption={chosenOption}
                />
              )}
            </div>
          );
        })}
      </ul>
    </section>
  );
};

export default Ticket;
