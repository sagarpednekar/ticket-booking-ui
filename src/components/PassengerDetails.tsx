/**
 * Represents the PassengerDetails component.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {ICart} props.passengers - The cart containing passenger details.
 * @param {IBooking[]} props.bookings - The array of booking details.
 * @param {Function} props.updatePassengerDetails - The function to update passenger details.
 * @param {Function} props.updateBookingDetails - The function to update booking details.
 */
import React from "react";
import { IBooking, ICart } from "../shared/interface";

// Enum to define error messages
enum ErrorMesaage {
  name = "Name is required",
  age = "Age is required",
  email = "Email is required",
}
interface IProps {
  passengers: ICart;
  bookings: IBooking[];
  updatePassengerDetails: (passenger: ICart) => void;
  updateBookingDetails: (booking: Partial<IBooking>) => void;
}

/**
 * PassengerDetails Component
 *
 * A React component that displays and allows users to edit passenger and booking details.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {ICart} props.passengers - The cart containing passenger details.
 * @param {IBooking[]} props.bookings - The array of booking details.
 * @param {Function} props.updatePassengerDetails - The function to update passenger details.
 * @param {Function} props.updateBookingDetails - The function to update booking details.
 */
export default function PassengerDetails({
  passengers,
  updatePassengerDetails,
  updateBookingDetails,
  bookings,
}: IProps) {

  /**
   * Check if a string is empty.
   *
   * @param {string} value - The string to check.
   * @returns {boolean} - True if the string is empty, false otherwise.
   */
  const isEmpty = (value: string): boolean => {
    return value.trim() === "";
  };

  /**
   * Handle change in input fields for booking details.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object.
   * @param {IBooking} booking - The booking object being updated.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    booking: IBooking
  ) => {
    const updatedBooking = {
      ...booking,
      [e.target.name as keyof IBooking]: e.target.value,
    };
    updateBookingDetails(updatedBooking);
  };

  /**
   * Handle change in the email input field for passenger details.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object.
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPassenger = {
      ...passengers,
      [e.target.name as keyof ICart]: e.target.value,
    };
    updatePassengerDetails(updatedPassenger as ICart);
  };

  // Component rendering
  return (
    <div className="p-2">
      {bookings.map((booking: IBooking, index: number) => (
        <div key={booking.seatNumber}>
          <p className="text-black text-2xl">
            Passenger {index + 1}| <b>Seat {booking.seatNumber}</b>{" "}
          </p>
          <div className="p-2">
            <label className="text-black" aria-label="passenger-name">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="border-2 border-slate-300 p-2 w-full mb-2"
              onChange={(e) => handleChange(e, booking)}
            />
            <p className="mt-1 peer-invalid:visible text-pink-600 text-sm">
              {isEmpty(booking.name) && ErrorMesaage.name}
            </p>
            <label className="text-black">Age</label>
            <input
              type="text"
              className="border-2 border-slate-300 p-2 w-full mb-2"
              onChange={(e) => handleChange(e, booking)}
              name="age"
            />
            <p className="mt-1 peer-invalid:visible text-pink-600 text-sm">
              {booking.age <= 0 && ErrorMesaage.age}
            </p>
          </div>
        </div>
      ))}

      <div>
        <hr />
        <section>
          <p className="text-black text-2xl">Contact Details</p>
          <div className="p-2">
            <label className="text-black">Email</label>
            <input
              type="text"
              name="email"
              className="border-2 border-slate-300 p-2 w-full mb-2"
              onChange={(e) => handleEmailChange(e)}
            />
            <p className="mt-1 peer-invalid:visible text-pink-600 text-sm">
              {isEmpty(passengers.email) && ErrorMesaage.email}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
