/**
 * Dashboard component displays a table of bookings and provides search functionality.
 * It also allows users to view booking details and cancel bookings.
 *
 * @component
 * @returns {JSX.Element} The Dashboard component.
 */
import { useState } from "react";
import { reservations } from "../shared/data";
import { TypeReservations } from "../shared/types";
import { BookingStatusEnum } from "../shared/interface";

// Define the search field type
type SearchField = "id" | "seatNumber" | "user";

/**
 * Dashboard Component
 *
 * A React component that displays a table of bookings, provides search functionality,
 * and allows users to view booking details and cancel bookings.
 *
 * @component
 * @returns {JSX.Element} The Dashboard component.
 */
export default function Dashboard() {
  // State variables
  const [bookings, setBookings] = useState<TypeReservations>(reservations);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<SearchField>("id");
  const [selectedBooking, setSelectedBooking] = useState<TypeReservations[number] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter bookings based on search criteria
  const filteredBookings = bookings.filter((booking) =>
    String(booking[searchField]).toLowerCase().includes(search.toLowerCase())
  );

  // Open modal to view booking details
  const openModal = (booking: TypeReservations[number]) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Cancel a booking
  const cancelBooking = (booking: TypeReservations[number]) => {
    const updatedBookings = bookings.map((b) => {
      if (b.id === booking.id) {
        return { ...b, status: BookingStatusEnum.CANCELED };
      }
      return b;
    });
    setBookings(updatedBookings);
    closeModal();
  };

  // Component rendering
  return (
    <div>
      {/* Search input and filter dropdown */}
      <div className="flex mb-4 mt-10">
        <input
          type="text"
          placeholder="Search bookings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border-2 border-gray-300 flex-grow"
        />
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value as SearchField)}
          className="ml-2 p-2 border-2 border-gray-300"
        >
          <option value="id">ID</option>
          <option value="seatNumber">Seat Number</option>
          <option value="user.name">Name</option>
        </select>
      </div>

      {/* Bookings table */}
      <table className="table-auto bg-white w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Seat Number</th>
            <th className="px-4 py-2">Booking Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border px-4 py-2">{booking.id}</td>
              <td className="border px-4 py-2">{booking.seatNumber}</td>
              <td className="border px-4 py-2">{booking.user.name}</td>
              <td className="border px-4 py-2">{booking.bookingDate}</td>
              <td className="border px-4 py-2 capitalize">{booking.status}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => openModal(booking)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Booking details modal */}
      {isModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Booking Details
                </h3>
                <div className="mt-2">
                  {selectedBooking && (
                    <>
                      <p className="px-4 py-2">
                        Booking ID:{selectedBooking.id}
                      </p>
                      <p className="px-4 py-2">
                        Seat Number: {selectedBooking.seatNumber}
                      </p>
                      <p className="px-4 py-2">
                        Name: {selectedBooking.user.name}
                      </p>
                      <p className="px-4 py-2">
                        Booking Date: {selectedBooking.bookingDate}
                      </p>

                      <button
                        className={`mb-2 mt-3 w-full text-white font-bold py-2 px-4 rounded ml-2 ${
                          selectedBooking.status === "canceled"
                            ? "cursor-not-allowed disabled:opacity-30 bg-gray-500 mb-2 mt-3 w-full hover:bg-gray-700"
                            : "bg-red-500 hover:bg-red-700"
                        }}`}
                        onClick={() => cancelBooking(selectedBooking)}
                        disabled={selectedBooking.status === "canceled"}
                      >
                        {selectedBooking.status === "canceled"
                          ? "Booking Canceled"
                          : "Cancele Booking"}
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="absolute top-0 right-0 m-4">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <div className="fixed inset-0 bg-black opacity-50">
        
        </div>}
    </div>
  );
}
