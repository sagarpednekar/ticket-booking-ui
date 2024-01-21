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
  