
import {  useNavigate } from "react-router-dom";
import PassengerDetails from "./PassengerDetails";
import { CheckoutStore } from "../store/CheckoutStore";
import { IBooking, ICart } from "../shared/interface";

export default function Checkout() {

  const cartDetails = CheckoutStore((state) => state.cart);
  const bookings = CheckoutStore((state) => state.bookings);
  const updateBookings = CheckoutStore((state) => state.updateBookings);
  const updateCartToStore = CheckoutStore(
    (state) => state.updatePassenger
  );
  const navigate = useNavigate();

  const onSubmitHandler = () => {
    
    // redirect to payment page
    navigate("/order-summary");
  };
  const updatePassengerDetails = (passenger: Partial<ICart>) => {
    updateCartToStore(passenger as ICart);
  };

  const updateBookingDetails = (booking: Partial<IBooking>) => {
    if (!booking) {
      return;
    }
    updateBookings(booking as IBooking);
  };

  return (
    <div className="bg-white container mb-2">
      <PassengerDetails
        passengers={cartDetails}
        updatePassengerDetails={updatePassengerDetails}
        updateBookingDetails={updateBookingDetails}
        bookings={bookings}
      />
      <button
        className="bg-slate-800 text-white p-4 mt-5 w-full mb-5"
        onClick={() => onSubmitHandler()}
      >
        Proceed to Pay{" "}
      </button>
    </div>
  );
}
