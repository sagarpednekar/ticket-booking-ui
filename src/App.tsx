import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { data } from "./shared/tickets";
import { useTicketStore } from "./store/TicketStore";
import "./App.css";

const Dashboard = React.lazy(() => import("./components/Dashboard"));
const SeatLayout = React.lazy(() => import("./components/SeatLayout"));
const Checkout = React.lazy(() => import("./components/Checkout"));
const OrderSummary = React.lazy(() => import("./components/OrderSummary"));
const LandingPage = React.lazy(() => import("./components/Home"));
const BusListing = React.lazy(() => import("./components/BusListing"));



function App() {
const addTickets = useTicketStore((state) => state.addTickets);

  useEffect(() => {
    addTickets(data);
  }, []);

  return (
    <main>
      <Navbar />
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" Component={LandingPage} />
            <Route path="/listing" Component={BusListing} />
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/booking" Component={SeatLayout} />
            <Route path="/checkout" Component={Checkout} />
            <Route path="/order-summary" Component={OrderSummary} />
          </Routes>
        </Suspense>
      </div>
    </main>
  );
}

export default App;
