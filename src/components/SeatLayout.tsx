import { useMemo, useState } from "react";
import SeatGrid from "./SeatGrid";
import { useNavigate } from "react-router-dom";
import { generateCartId } from "../shared/utility";
import { useTicketStore } from "../store/TicketStore";
import { CheckoutStore } from "../store/CheckoutStore";
import { BookingStatusEnum, IBooking, ICart } from "../shared/interface";

function SeatLayout() {
  const storeTickets = useTicketStore((state) => state.tickets);
  const updatePassenger = CheckoutStore((state) => state.updatePassenger);
  const addBookings = CheckoutStore((state) => state.addBookings);
  const [selectedTickets, setSelectedSeats] = useState<string[]>([]);

  const memoizedTickets = useMemo(() => {
    return storeTickets;
  }, [storeTickets]);

  const updateTicketToTicket = useTicketStore(
    (state) => state.updateTicketStatus
  );
  const navigate = useNavigate();
  const handleSelecteSeats = (seatNumber: string) => {
    setSelectedSeats([...selectedTickets, seatNumber]);
  };

  const proceedToPay = () => {
    if (selectedTickets.length === 0) {
      alert("Please select atleast one seat");
      return;
    }

    const cartDetails: ICart = {
      email: "",
      totalAmount: 0,
      bookingId: "",
      cartId: generateCartId(),
      bookingDate: new Date().toISOString(),
      journeyDate: new Date().toISOString(),
    };
    const bookings = selectedTickets.map((seatNumber: string) => {
      return {
        seatNumber,
        name: "",
        age: 0,
        status: BookingStatusEnum.CONFIRMED,
        price: 900,
      };
    });
    updatePassenger(cartDetails);
    addBookings(bookings as IBooking[]);
    navigate("/checkout", { state: { cartId: cartDetails.cartId } });
  };

  return (
    <>
      <div className="border-slate-300 border-1 p-5 space-0 bg-white">
        <h1 className="p-2 mb-2 text-grey"> Upper Birth</h1>
        <SeatGrid
          tickets={memoizedTickets.slice(20, 40)}
          selectSeat={updateTicketToTicket}
          handleSelecteSeats={handleSelecteSeats}
        />

        <h1 className="p-2 mb-2"> Lower Birth</h1>
        <SeatGrid
          tickets={memoizedTickets.slice(0, 20)}
          selectSeat={updateTicketToTicket}
          handleSelecteSeats={handleSelecteSeats}
        />
        <button
          className="bg-slate-800 text-white p-2 mt-5"
          onClick={proceedToPay}
        >
          Proceed to Pay{" "}
        </button>
      </div>
      <div className="border-slate-300 border-1 space-0 p-2">
        {/* Render card here */}
      </div>
    </>
  );
}

export default SeatLayout;
