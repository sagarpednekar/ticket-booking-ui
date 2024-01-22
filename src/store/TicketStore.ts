import { create } from "zustand";
import { data } from "../shared/tickets";
import { ITicket, TicketStore } from "../shared/interface";

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: data,
  updateTicketStatus: (seatNumber, status) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.seatNumber === seatNumber
          ? { ...ticket, isAvailable: status }
          : ticket
      ),
    }));
  },
  addTickets: (tickets: ITicket[]) => {
    set((state) => ({
      tickets: [...state.tickets, ...tickets],
    }));
  }

}));
