import { create } from "zustand";
import cloneDeep from 'lodash.clonedeep';
import { IBooking, ICart, ICheckoutStore } from "../shared/interface";

/**
 * Represents the CheckoutStore object.
 */
export const CheckoutStore = create<ICheckoutStore>((set) => ({
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
    updatePassenger: (cart: Partial<ICart>) => {
        set((state) => ({
            cart: { ...state.cart, ...cloneDeep(cart) },
        }));
    },

    /**
     * Updates the booking information in the store.
     * @param booking - The updated booking object.
     */
    updateBookings: (booking: IBooking) => {
        set((state) => ({
            bookings: state.bookings.map((item) =>
                item.seatNumber === booking.seatNumber ? {
                    ...item,
                    ...cloneDeep(booking),
                } : item
            ),
        }));
    }
}));
