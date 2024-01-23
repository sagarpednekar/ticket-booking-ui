/**
 * Checkout component for the bus ticket booking UI.
 * Renders the passenger details form and handles the submission of the form.
 *
 * @component
 * @returns {JSX.Element} The Checkout component.
 */
import { useNavigate } from "react-router-dom";
import PassengerDetails from "./PassengerDetails";
import { CartStore } from "../store/cartStore";
import { IBooking, ICart } from "../shared/interface";

/**
 * Checkout Component
 *
 * A React component that renders the passenger details form and handles form submission.
 *
 * @component
 * @returns {JSX.Element} The Checkout component.
 */
export default function Checkout() {
  // Retrieve cart details, bookings, and store update functions from CartStore
  const cartDetails = CartStore((state) => state.cart);
  const bookings = CartStore((state) => state.bookings);

  const updateBookings = CartStore((state) => state.updateBooking);
  const updateCartToStore = CartStore((state) => state.updateCart);

  // React Router navigate function
  const navigate = useNavigate();

  /**
   * Handle form submission.
   * Redirects the user to the order summary page.
   */
  const onSubmitHandler = () => {
    // Redirect to the order summary page
    navigate("/order-summary");
  };

  /**
   * Update passenger details in the store.
   *
   * @param {Partial<ICart>} passenger - The partial passenger details to update.
   */
  const updatePassengerDetails = (passenger: Partial<ICart>) => {
    updateCartToStore(passenger as ICart);
  };

  /**
   * Update booking details in the store.
   *
   * @param {Partial<IBooking>} booking - The partial booking details to update.
   */
  const updateBookingDetails = (booking: Partial<IBooking>) => {
    if (!booking) {
      return;
    }
    updateBookings(booking as IBooking);
  };

  // Component rendering
  return (
    <div className="bg-white container mb-2">
      {/* Render the PassengerDetails component */}
      <PassengerDetails
        passengers={cartDetails}
        updatePassengerDetails={updatePassengerDetails}
        updateBookingDetails={updateBookingDetails}
        bookings={bookings}
      />

      {/* Proceed to Pay Button */}
      <button
        className="bg-slate-800 text-white p-4 mt-5 w-full mb-5"
        onClick={() => onSubmitHandler()}
      >
        Proceed to Pay
      </button>
    </div>
  );
}
