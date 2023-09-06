import React from "react";
import Header from "../components/header/Header";
import Hero from "../components/home/Hero";
import Carousel from "../components/home/Carousel";
import TicketOptions from "../components/tickets/TicketOptions";
import BoatRental from "../components/boats/BoatRental";
import Restaurant from "../components/restaurant/Restaurant";
import Footer from "../components/home/Footer";

const Home = ({ userRole }) => {
  return (
    <section className="flex flex-col">
      <Header userRole={userRole}></Header>
      <Hero></Hero>
      <Carousel></Carousel>
      <TicketOptions></TicketOptions>
      <BoatRental></BoatRental>
      <Restaurant></Restaurant>
      <Footer></Footer>
    </section>
  );
};

export default Home;
