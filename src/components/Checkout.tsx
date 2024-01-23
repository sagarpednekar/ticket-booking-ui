/**
 * Checkout Component
 *
 * A React component that renders the passenger details form and handles form submission.
 *
 * @component
 * @returns {JSX.Element} The Checkout component.
 */
import { useNavigate } from "react-router-dom";
import PassengerDetails from "./PassengerDetails";
import { useCartStore } from "../store/cartStore";
import { IBooking, ICart } from "../shared/interface";
import { debounce } from "../helpers";

/**
 * Checkout Component
 *
 * The `Checkout` component handles the rendering of the passenger details form
 * and submission of the form. It interacts with the `useCartStore` to retrieve
 * and update cart details and bookings.
 *
 * @component
 * @returns {JSX.Element} The Checkout component.
 */
const Checkout: React.FC = () => {
  // Retrieve cart details, bookings, and store update functions from useCartStore
  const cartDetails = useCartStore((state) => state.cart);
  const bookings = useCartStore((state) => state.bookings);

  const updateBookings = useCartStore((state) => state.updateBooking);
  const updateCartToStore = useCartStore((state) => state.updateCart);

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
    if (!passenger) {
      return;
    }
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

  // Debounce update functions to avoid frequent updates
  const debouncedUpdatePassengerDetails = debounce(updatePassengerDetails, 500);
  const debouncedUpdateBookingDetails = debounce(updateBookingDetails, 500);

  // Component rendering
  return (
    <div className="bg-white container mb-2">
      {/* Render the PassengerDetails component */}
      <PassengerDetails
        passengers={cartDetails}
        updatePassengerDetails={debouncedUpdatePassengerDetails}
        updateBookingDetails={debouncedUpdateBookingDetails}
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
};

export default Checkout;
