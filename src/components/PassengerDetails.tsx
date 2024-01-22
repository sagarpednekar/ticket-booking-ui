import React from "react";
import { IBooking, ICart } from "../shared/interface";

enum ErrorMesaage {
  name = "Name is required",
  age = "Age is required",
  email = "Email is required",
}

interface IProps {
  passengers: ICart;
  isSubmit: boolean;
  bookings: IBooking[];
  updatePassengerDetails: (passenger: ICart) => void;
  updateBookingDetails: (booking: Partial<IBooking>) => void;
}

export default function PassengerDetails({
  passengers,
  updatePassengerDetails,
  updateBookingDetails,
  bookings,
}: IProps) {
  console.log("passenger", passengers);

  const isEmpty = (value: string): boolean => {
    return value.trim() === "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    booking: IBooking
  ) => {
    const updatedBooking = {
      ...booking,
      [e.target.name as keyof IBooking]: e.target.value,
    };
    updateBookingDetails(updatedBooking); // Cast updatedPassenger as ICart
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPassenger = {
      ...passengers,
      [e.target.name as keyof ICart]: e.target.value,
    };
    console.log("updatedPassenger emiakl", updatedPassenger);
    
    updatePassengerDetails(updatedPassenger as ICart); // Cast updatedPassenger as ICart
  };

  return (
    <div className="p-2">
      {bookings.map((booking: IBooking, index: number) => (
        <div key={booking.seatNumber}>
          <p className="text-black text-2xl">
            Pasenger {index + 1}| <b>Seat {booking.seatNumber}</b>{" "}
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
