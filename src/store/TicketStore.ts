import { create } from "zustand";
import { data } from "../shared/tickets";
import { ITicket, TicketStore } from "../shared/interface";

/**
 * Custom hook for managing ticket store state.
 * @returns An object containing the ticket store state and methods to update it.
 */
export const useTicketStore = create<TicketStore>((set) => ({
  tickets: data,
  /**
   * Updates the status of a ticket with the given seat number.
   * @param seatNumber - The seat number of the ticket to update.
   * @param status - The new status of the ticket.
   */
  updateTicketStatus: (seatNumber, status) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.seatNumber === seatNumber
          ? { ...ticket, isAvailable: status }
          : ticket
      ),
    }));
  },
  /**
   * Adds new tickets to the ticket store.
   * @param tickets - An array of tickets to add.
   */
  addTickets: (tickets: ITicket[]) => {
    set((state) => ({
      tickets: [...state.tickets, ...tickets],
    }));
  }
}));
