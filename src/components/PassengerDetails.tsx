import { useEffect, useState } from "react";
import { IReservation, IUser } from "../shared/interface";

enum ErrorMesaage {
  name = "Name is required",
  age = "Age is required",
  email = "Email is required",
}
interface IProps {
  passengerDetail: IReservation;
  isSubmit: boolean;
  updatePassengerDetails: (user: IUser, seatNumber: string) => void;
}

export default function PassengerDetails({
  passengerDetail,
  updatePassengerDetails,
  isSubmit,
}: IProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const isEmpty = (value: string): boolean => {
    return value.trim() === "";
  };
  const isValidInput = (): boolean => {
    return !isEmpty(name) && !isEmpty(age);
  };

  useEffect(() => {
    if (isSubmit && isValidInput()) {
      updatePassengerDetails(
        { name, age: parseInt(age) },
        passengerDetail.seatNumber
      );
    }
  }, [isSubmit]);

  return (
    <div className="p-2">
      <p className="text-black text-2xl">
        Pasenger {passengerDetail.id}| <b>Seat {passengerDetail.seatNumber}</b>{" "}
      </p>
      <div className="p-2">
        <label className="text-black" aria-label="passenger-name">
          Name
        </label>
        <input
          type="text"
          id="passenger-name"
          className="border-2 border-slate-300 p-2 w-full mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="mt-1 peer-invalid:visible text-pink-600 text-sm">
          {isEmpty(name) && ErrorMesaage.name}
        </p>
        <label className="text-black">Age</label>
        <input
          type="text"
          className="border-2 border-slate-300 p-2 w-full mb-2"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <p className="mt-1 peer-invalid:visible text-pink-600 text-sm">
          {isEmpty(age) && ErrorMesaage.age}
        </p>
      </div>
    </div>
  );
}
