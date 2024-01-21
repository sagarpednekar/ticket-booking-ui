import { IReservation } from "./interface";

export type UserTicket = Pick<IReservation, "user" | "seatNumber">;
  
export type TypeReservations = IReservation[];