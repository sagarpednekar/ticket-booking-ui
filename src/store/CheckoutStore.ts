import { create } from "zustand";
import cloneDeep from 'lodash.clonedeep';
import { IBooking, ICart, ICheckoutStore } from "../shared/interface";

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
    addBookings: (booking: IBooking | IBooking[]) => {
        set((state) => ({
            bookings: [...state.bookings, ...(Array.isArray(booking) ? booking : [booking])],
        }));
    },
    updatePassenger: (cart: Partial<ICart>) => {
        set((state) => ({
            cart: { ...state.cart, ...cloneDeep(cart) },
        }));
    },
    updateBookings: (booking: IBooking) => {
        set((state) => ({
            bookings: state.bookings.map((item) =>
                item.seatNumber === booking.seatNumber ? {
                    ...item,
                    ...cloneDeep(booking),
                } : item
            ),
        }));
    },
    updateCart: (cart) => {
        console.log(
            "🚀 ~ file: CheckoutStore.ts ~ line 93 ~ set ~ cart",
            cart
        );

        set((state) => ({
            carts: state.carts.map((item) => {

                return item.cartId === cart.cartId ? {
                    ...item,
                    ...cloneDeep(cart),
                } : item
            }
            ),

        }));
    },
    addToCart(cart) {
        set((state) => ({
            carts: [...state.carts, cart],
        }));
    },
    removeCartById: (cartId: string) => {
        set((state) => ({
            carts: state.carts.filter((item) => item.cartId !== cartId),
        }));
    },
}));
