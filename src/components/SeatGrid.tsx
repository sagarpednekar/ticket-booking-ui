/**
 * Renders a grid of seats for ticket booking.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {ITicket[]} props.tickets - The array of ticket objects.
 * @param {Function} props.selectSeat - The function to select/unselect a seat.
 * @param {Function} props.handleSelecteSeats - The function to handle the selection of seats.
 * @returns {JSX.Element} The seat grid component.
 */
import { ITicket } from "../shared/interface";

// Define the props type for the component
type IProps = {
  tickets: ITicket[];
  selectSeat: (seatNumber: string, status: boolean) => void;
  handleSelecteSeats: (seatNumber: string) => void;
};

/**
 * SeatGrid Component
 *
 * A React component that renders a grid of seats for ticket booking.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {ITicket[]} props.tickets - The array of ticket objects.
 * @param {Function} props.selectSeat - The function to select/unselect a seat.
 * @param {Function} props.handleSelecteSeats - The function to handle the selection of seats.
 * @returns {JSX.Element} The seat grid component.
 */
export default function SeatGrid({
  tickets,
  selectSeat,
  handleSelecteSeats,
}: IProps) {
  /**
   * Function to determine the CSS class for selected seats.
   *
   * @returns {string} - The CSS class for selected seats.
   */
  const isSelected = () =>
    "p-2 text-center border-2 text-white bg-slate-800 w-full";

  // Component rendering
  return (
    <div className="border-slate-300 border-2 p-5">
      <div className="grid grid-cols-5 gap-5 mb-2">
        {/* Map through the tickets array to render individual seat buttons */}
        {tickets.map((ticket: ITicket) => {
          return (
            <div className="relative" key={ticket.id}>
              {/* Seat button with onClick event to handle seat selection */}
              <button
                onClick={() => {
                  selectSeat(ticket.seatNumber, !ticket.isAvailable);
                  handleSelecteSeats(ticket.seatNumber);
                }}
                className={
                  ticket.isAvailable
                    ? "border-slate-300 border-2 p-2 text-center w-full"
                    : isSelected()
                }
              >
                {ticket.seatNumber}
              </button>
              
              {/* Additional information displayed on hover */}
              <div className="absolute bottom-full mb-2 w-32 text-center bg-gray-700 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition duration-200">
                Seat Number: {ticket.seatNumber}, Price: ₹{ticket.price}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
