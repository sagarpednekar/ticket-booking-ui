import { create } from "zustand";
import { IBooking, ICart, ICartStore } from "../shared/interface";
/**
 * Represents the CartStore object.
 */
export const CartStore = create<ICartStore>((set) => ({
    carts: [],
    cart: {
        cartId: "",
        email: "",
        bookings: [],
        bookingId: "",
        totalAmount: 0,
        bookingDate: "",
        journeyDate: "",
    },
    bookings: [],
    /**
     * Adds one or more bookings to the store.
     * @param booking - The booking(s) to be added.
     */
    addBookings: (booking: IBooking | IBooking[]) => {
        set((state) => ({
            bookings: [...state.bookings, ...(Array.isArray(booking) ? booking : [booking])],
        }));
    },

    /**
     * Updates the passenger information in the cart.
     * @param cart - The partial cart object containing the updated passenger information.
     */
    updateCart: (cart: Partial<ICart>) => {
        set((state) => ({
            cart: { ...state.cart, ...cart },
        }));
    },

    /**
     * Updates the booking information in the store.
     * @param booking - The updated booking object.
     */
    updateBooking: (booking: IBooking) => {
        set((state) => ({
            bookings: state.bookings.map((item) =>
                item.seatNumber === booking.seatNumber ? {
                    ...item,
                    ...booking,
                } : item
            ),
        }));
    }
}));
