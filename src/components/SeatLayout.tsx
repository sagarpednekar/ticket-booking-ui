import { useState } from "react";
import { reservations } from "../shared/data";
import SeatGrid from "./SeatGrid";
import { TypeReservations } from "../shared/types";
import { IReservation } from "../shared/interface";

function SeatLayout() {
  const [tickets, setTickets] = useState<TypeReservations>(reservations);
  console.log(tickets);

  const selectSeat = (seatNumber: string) => {
    const newTickets = tickets.map((ticket: IReservation) => {
      if (ticket.seatNumber === seatNumber) {
        ticket.isAvailable = !ticket.isAvailable;
      }
      return ticket;
    });
    setTickets(newTickets);
  }

  // const proceedToPay = () => {
  //   // redirect to payment page
  // }


  return (
    <>
      <div className="border-slate-300 border-1 p-5 space-0 bg-white">

        <h1 className="p-2 mb-2 text-grey"> Upper Birth</h1>
        <SeatGrid tickets={tickets.slice(20, 40)} selectSeat={selectSeat} />

        <h1 className="p-2 mb-2"> Lower Birth</h1>
        <SeatGrid tickets={tickets.slice(0, 20)} selectSeat={selectSeat} />
        <button className="bg-slate-800 text-white p-2 mt-5">Proceed to Pay </button>
      </div>
      <div className="border-slate-300 border-1 space-0 p-2">
        {/* Render card here */}
      </div>
    </>

  );
}

export default SeatLayout;
