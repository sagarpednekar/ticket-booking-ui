import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PassengerDetails from "./PassengerDetails";
import { reservations } from "../shared/data";
import { generateUUID } from "../shared/utility";
import { IReservation, IUser } from "../shared/interface";

export default function Checkout() {
  const [passengers, updatePassenger] = useState<IReservation[]>(
    reservations.slice(0, 2)
  );

  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = () => {
    setIsSubmit(true);
    // redirect to payment page
    console.log("passengers", passengers);
    navigate("/order-summary", { state: { passengers } });
  };

  const updatePassengerDetails = (user: IUser, seatNumber: string) => {
    console.log("user", user);
    const passengerData = passengers.find(
      (passenger: IReservation) => passenger.seatNumber === seatNumber
    );
    if (passengerData) {
      updatePassenger([
        ...passengers.filter(
          (passenger: IReservation) => passenger.seatNumber !== seatNumber
        ),
        {
          ...passengerData,
          user: { ...user },
          bookingDate: new Date().toISOString(),
          status: "confirmed",
          id: generateUUID(),
        },
      ]);
    }
    console.log("passengers", passengers);
  };

  return (
    <div className="bg-white container mb-2">
      {passengers.map((passenger: IReservation) => {
        return (
          <PassengerDetails
            passengerDetail={passenger}
            updatePassengerDetails={updatePassengerDetails}
            isSubmit={isSubmit}
            key={passenger.seatNumber}
          />
        );
      })}
      <div>
        <hr />
        <section>
          <p className="text-black text-2xl">Contact Details</p>
          <div className="p-2">
            <label className="text-black">Email</label>
            <input
              type="text"
              className="border-2 border-slate-300 p-2 w-full mb-2"
            />
          </div>
        </section>
      </div>
      <button
        className="bg-slate-800 text-white p-4 mt-5 w-full mb-5"
        onClick={() => onSubmitHandler()}
      >
        Proceed to Pay{" "}
      </button>
    </div>
  );
}
