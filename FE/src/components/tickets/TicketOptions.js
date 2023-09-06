import React from "react";
import Ticket from "./Ticket";

const TicketOptions = () => {
  return (
    <section
      id="ticketOptionsSection"
      className="justify-center items-center py-20 mb-10"
    >
      <div className="container flex m-auto items-center">
        <Ticket></Ticket>
      </div>
    </section>
  );
};

export default TicketOptions;
