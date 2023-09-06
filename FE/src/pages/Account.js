import React, { useEffect, useState } from "react";
import { cartData } from "../Data";
import Footer from "../components/home/Footer";
import moment from "moment";

const Account = () => {
  const [orders, setOrders] = useState([]);
  const { img } = cartData;

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/orders/loggedUserAllOrders",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (response.ok) {
          const orders = await response.json();
          setOrders(orders);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const downloadPdf = async (index) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/pdf/${orders[index].id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (response.ok) {
        const pdfBlob = await response.blob();
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `EGRETA_Order_${orders[index].orderNumber}.pdf`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen flex flex-col text-center">
      <div className="flex flex-col justify-center items-center">
        <p className="text-center title mt-10">Contul Meu</p>
        <div className="flex flex-col gap-10 container">
          <div className={`${orders.length > 0 ? "" : "hidden"}`}>
            <p className="mb-4 font-semibold">Comenzi</p>
            <div className="flex items-center text-sm">
              <p className="w-1/4">Comanda nr.</p>
              <p className="w-1/4">Achiziționată în</p>
              <p className="w-1/4">Preț Total</p>
              <p className="w-1/4">Descarcă în PDF</p>
            </div>
            <hr />
            <div className="flex flex-col mt-2 mb-5 gap-2 overflow-y-auto max-h-[290px] p-4">
              {orders.length > 0
                ? orders.map((order, index) => {
                    return (
                      <div className="flex items-center text-sm ">
                        <p className="w-1/4">{order.orderNumber}</p>
                        <p className="w-1/4">
                          {moment(order.purchasedOn).format("DD-MM-YYYY, dddd")}
                        </p>
                        <p className="w-1/4">{order.totalPrice} RON</p>
                        <button
                          className="btn btn-sm btn-outline w-1/4"
                          onClick={() => {
                            downloadPdf(index);
                          }}
                        >
                          Descarcă
                        </button>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
          <img
            src={img.src}
            alt={img.alt}
            className={`${orders.length > 0 ? "hidden" : ""} w-[50vh] m-auto`}
          />
        </div>
        <a className="btn btn-sm btn-outline m-auto w-1/3" href="/">
          Înapoi Acasa
        </a>
      </div>
      <div className="flex-grow"></div>
      <div>
        <Footer></Footer>
      </div>
    </section>
  );
};

export default Account;
