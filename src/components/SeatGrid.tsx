/**
 * Renders a grid of seats for ticket booking.
 *
 * @param {Object[]} tickets - The array of ticket objects.
 * @param {Function} selectSeat - The function to select/unselect a seat.
 * @param {Function} handleSelecteSeats - The function to handle the selection of seats.
 * @returns {JSX.Element} The seat grid component.
 */
import { ITicket } from "../shared/interface";

type IProps = {
  tickets: ITicket[];
  selectSeat: (seatNumber: string, status: boolean) => void;
  handleSelecteSeats: (seatNumber: string) => void;
};

export default function SeatGrid({
  tickets,
  selectSeat,
  handleSelecteSeats,
}: IProps) {
  const isSelected = () =>
    "p-2 text-center border-2 text-white bg-slate-800 w-full";
  return (
    <div className="border-slate-300 border-2 p-5">
      <div className="grid grid-cols-5 gap-5 mb-2">
        {tickets.map((ticket: ITicket) => {
          return (
            <div className="relative" key={ticket.id}>
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