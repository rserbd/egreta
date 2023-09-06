import React, { useEffect, useState } from "react";
import moment from "moment";

const Admin = () => {
  const [orders, setOrders] = useState();
  const [totalIncomeAllTime, setTotalIncomeAllTime] = useState();
  const [totalIncomeCurrentMonth, setTotalIncomeCurrentMonth] = useState();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/orders/allUsersOrders",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (response.ok) {
          const content = await response.json();
          setOrders(content.orders);
          setTotalIncomeAllTime(content.totalIncome.totalIncomeAllTime);
          setTotalIncomeCurrentMonth(
            content.totalIncome.totalIncomeCurrentMonth
          );
        }
      } catch (error) {}
    })();
  }, []);

  const downloadPdf = async (index) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/pdf/admin/${orders[index].user.id}/${orders[index].id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const pdfBlob = await response.blob();
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `EGRETA_User_${orders[index].user.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen flex flex-col gap-5 items-center">
      <p className="text-center title mt-10">Toate Comenzile</p>
      <div className="container flex flex-col gap-10">
        <div>
          <div className="flex text-sm text-center">
            <p className="w-1/4">Comanda nr.</p>
            <p className="w-1/4">Achiziționată în</p>
            <p className="w-1/4">Preț Total</p>
            <p className="w-1/4">Descarcă în PDF</p>
          </div>
          <hr />
          <div className="flex flex-col mt-2 mb-5 gap-2 text-sm text-center overflow-y-auto max-h-[290px] p-4">
            {orders?.length > 0
              ? orders.map((order, index) => {
                  return (
                    <div className="flex items-center text-sm">
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
        <div className="flex flex-col items-center">
          <div className="flex text-center text-sm w-1/2">
            <p className="w-1/2">Venit luna curentă</p>
            <p className="w-1/2">Venit total</p>
          </div>
          <hr className="w-1/2" />
          <div className="flex text-center text-sm w-1/2">
            <p className="w-1/2">{totalIncomeCurrentMonth} RON</p>
            <p className="w-1/2">{totalIncomeAllTime} RON</p>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
      <a className="btn btn-sm btn-outline w-1/3 mb-10" href="/">
        Înapoi Acasa
      </a>
    </section>
  );
};

export default Admin;
