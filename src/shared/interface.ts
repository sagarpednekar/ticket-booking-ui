export interface IUser {
  name: string;
  age: number;
  email?: string;
}

export interface IReservation {
  id: string;
  seatNumber: string;
  isAvailable: boolean;
  user: IUser;
  bookingDate?: string;
  status: "pending" | "confirmed" | "canceled";
}

export enum BookingStatusEnum {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELED = "canceled",
}

export interface IBooking {
  seatNumber: string;
  name: string;
  age: number;
  status: BookingStatusEnum;
  price: number;
}

export interface ICart {
  cartId: string;
  email: string;
  bookingId: string;
  totalAmount: number;
  bookingDate: string;
  journeyDate: string;
}

export interface ICheckoutStore {
  carts: ICart[];
  cart: ICart;
  bookings: IBooking[];
  updatePassenger: (cart: Partial<ICart>) => void;
  addBookings: (booking: IBooking | IBooking[]) => void;
  updateBookings: (booking: IBooking) => void;
}

export interface ITicket {
  id: string;
  seatNumber: string;
  isAvailable: boolean;
  price: number;
}

export type TicketStore = {
  tickets: ITicket[];
  addTickets: (tickets: ITicket[]) => void;
  updateTicketStatus: (seatNumber: string, status: boolean) => void;
};