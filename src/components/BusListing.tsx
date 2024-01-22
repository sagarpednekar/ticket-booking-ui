import { useNavigate } from "react-router-dom";

const BusListing = () => {
  const buses = [
    { id: 1, agency: 'Agency 1', price: '₹3000', hours: '5', source: 'City A', destination: 'City B' },
    { id: 2, agency: 'Agency 2', price: '₹3500', hours: '6', source: 'City B', destination: 'City C' },
    { id: 3, agency: 'Agency 3', price: '₹4000', hours: '7', source: 'City C', destination: 'City D' },
    { id: 4, agency: 'Agency 4', price: '₹4500', hours: '8', source: 'City D', destination: 'City E' },
    { id: 5, agency: 'Agency 5', price: '₹5000', hours: '9', source: 'City E', destination: 'City F' },
  ];
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-around">
      {buses.map((bus) => (
        <div key={bus.id} className="max-w-full rounded overflow-hidden shadow-lg m-4 flex">
          <img className="w-1/5" src="https://via.placeholder.com/150" alt="Bus" />
          <div className="px-6 py-4 w-4/5">
            <div className="font-bold text-xl mb-2">{bus.agency}</div>
            <p className="text-gray-700 text-base">
              Price: {bus.price}
            </p>
            <p className="text-gray-700 text-base">
              Journey Time: {bus.hours} hours
            </p>
            <p className="text-gray-700 text-base">
              Source: {bus.source}
            </p>
            <p className="text-gray-700 text-base">
              Destination: {bus.destination}
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded" 
                onClick={() => navigate("/booking")}
            >
              Buy
            </button>
          </div>
          </div>

      ))}
    </div>
  );
};

export default BusListing;