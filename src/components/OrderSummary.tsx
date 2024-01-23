/**
 * Renders the Order Summary component.
 * This component displays the order summary details including booking ID, status, seat numbers, and a success message.
 * It also provides a button to navigate back to the home page.
 */
import { useNavigate } from "react-router-dom";
import { CheckoutStore } from "../store/CheckoutStore";

export default function OrderSummary() {
  const orderDetails = CheckoutStore((state) => state.cart);
  const bookings = CheckoutStore((state) => state.bookings);
  const navigate = useNavigate();

  /**
   * Redirects the user to the home page.
   */
  const redirectToHome = () => {
    navigate({ pathname: "/" });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
        <p className="text-lg mb-2">
          <span className="font-bold">Booking ID:</span> {orderDetails.cartId}
        </p>
        <p className="text-lg mb-2">
          <span className="font-bold">Status: CNF</span> {}
        </p>
        <p className="text-lg">
          <span className="font-bold">Seat Number:</span> {bookings?.map((item: any) => item.seatNumber).join(", ")}
        </p>
        <p className="text-lg mt-4 text-green-500">
          Congratulations! Your booking for {bookings?.map((item: any) => item.seatNumber).join(", ")} on {new Date(orderDetails.bookingDate).toLocaleDateString()} was successful!
        </p>
        <button className="bg-slate-800 text-white p-4 mt-5 w-full mb-5" onClick={redirectToHome}>
          Go to Home
        </button>
      </div>
    </div>
  );
}