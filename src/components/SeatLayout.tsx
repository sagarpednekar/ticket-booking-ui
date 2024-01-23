import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SeatGrid from "./SeatGrid";
import { generateCartId } from "../shared/utility";
import { useTicketStore } from "../store/TicketStore";
import { CartStore } from "../store/cartStore";
import { BookingStatusEnum, IBooking, ICart } from "../shared/interface";

/**
 * SeatLayout Component
 *
 * A React component that displays seat grids for upper and lower births,
 * allowing users to select seats and proceed to payment.
 */
function SeatLayout() {
  // State and store hooks
  const storeTickets = useTicketStore((state) => state.tickets);
  const updateCart = CartStore((state) => state.updateCart);
  const addBookings = CartStore((state) => state.addBookings);
  const [selectedTickets, setSelectedSeats] = useState<string[]>([]);

  // Memoize tickets for performance optimization
  const memoizedTickets = useMemo(() => {
    return storeTickets;
  }, [storeTickets]);

  // Update ticket status function
  const updateTicketToTicket = useTicketStore(
    (state) => state.updateTicketStatus
  );
  
  // React Router navigate function
  const navigate = useNavigate();

  // Event handler for selecting seats
  const handleSelecteSeats = (seatNumber: string) => {
    setSelectedSeats([...selectedTickets, seatNumber]);
  };

  // Proceed to payment function
  const proceedToPay = () => {
    if (selectedTickets.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    // Create cart details
    const cartDetails: ICart = {
      email: "",
      totalAmount: 0,
      bookingId: "",
      cartId: generateCartId(),
      bookingDate: new Date().toISOString(),
      journeyDate: new Date().toISOString(),
    };

    // Create bookings based on selected seats
    const bookings = selectedTickets.map((seatNumber: string) => {
      return {
        seatNumber,
        name: "",
        age: 0,
        status: BookingStatusEnum.CONFIRMED,
        price: 900,
      };
    });

    // Update passenger details and add bookings to store
    updateCart(cartDetails);
    addBookings(bookings as IBooking[]);

    // Navigate to the checkout page with cart details
    navigate("/checkout", { state: { cartId: cartDetails.cartId } });
  };

  // Component rendering
  return (
    <>
      {/* Upper Berth SeatGrid */}
      <div className="border-slate-300 border-1 p-5 space-0 bg-white">
        <h1 className="p-2 mb-2 text-grey"> Upper Berth</h1>
        <SeatGrid
          tickets={memoizedTickets.slice(20, 40)}
          selectSeat={updateTicketToTicket}
          handleSelecteSeats={handleSelecteSeats}
        />

        {/* Lower Berth SeatGrid */}
        <h1 className="p-2 mb-2"> Lower Berth</h1>
        <SeatGrid
          tickets={memoizedTickets.slice(0, 20)}
          selectSeat={updateTicketToTicket}
          handleSelecteSeats={handleSelecteSeats}
        />

        {/* Proceed to Pay Button */}
        <button
          className="bg-slate-800 text-white p-2 mt-5"
          onClick={proceedToPay}
        >
          Proceed to Pay
        </button>
      </div>

      {/* Card Section */}
      <div className="border-slate-300 border-1 space-0 p-2">
        {/* Render card here */}
      </div>
    </>
  );
}

export default SeatLayout;
