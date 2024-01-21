import { IReservation } from "../shared/data";

type IProps = {
  tickets: IReservation[];
  selectSeat: (seatNumber: string) => void;
};

export default function SeatGrid({ tickets, selectSeat }: IProps) {
  const isSelected = () =>
    "p-2 text-center border-2 text-white bg-slate-800 w-full";
  return (
    <div className="border-slate-300 border-2 p-5">
      <div className="grid grid-cols-5 gap-5 mb-2">
        {tickets.map((ticket: IReservation) => {
          return (
            <button
              onClick={() => selectSeat(ticket.seatNumber)}
              className={
                ticket.isAvailable
                  ? "border-slate-300 border-2 p-2 text-center w-full"
                  : isSelected()
              }
              key={ticket.id}
            >
              {ticket.seatNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
}
