import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import SeatLayout from "./components/SeatLayout";
import Checkout from "./components/Checkout";
import OrderSummary from "./components/OrderSummary";
import "./App.css";


function App() {
  const reservations = [...Array(40)].map((_, index) => {
    return {
      id: `${index + 1}`,
      seatNumber: index <= 20 ? `A-${index + 1}` : `B-${index + 1}`,
      isAvailable: true,
      user: {
        name: "",
        age: 0,
      },
      bookingDate: new Date(),
      status: "pending",
    };
  });
  console.log(reservations);

  return (
    <main>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/booking" Component={SeatLayout} />
          <Route path="/checkout" Component={Checkout} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/order-summary" Component={OrderSummary} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
