/**
 * The main component of the application.
 * Renders the navigation bar and the different routes of the application.
 *
 * @component
 * @returns {JSX.Element} The App component.
 */
import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { data } from "./shared/tickets";
import { useTicketStore } from "./store/TicketStore";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy-loaded components
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const SeatLayout = React.lazy(() => import("./components/SeatLayout"));
const Checkout = React.lazy(() => import("./components/Checkout"));
const OrderSummary = React.lazy(() => import("./components/OrderSummary"));
const LandingPage = React.lazy(() => import("./components/Home"));
const BusListing = React.lazy(() => import("./components/BusListing"));

/**
 * App Component
 *
 * The main component of the application that renders the navigation bar and the different routes.
 *
 * @component
 * @returns {JSX.Element} The App component.
 */
function App() {
  // Add tickets to the store on component mount
  const addTickets = useTicketStore((state) => state.addTickets);
  useEffect(() => {
    addTickets(data);
  }, []);

  // Component rendering
  return (
    <main>
      <ErrorBoundary>
      {/* Navigation bar */}
      <Navbar />
      <div className="container">
        {/* Lazy-loaded routes with suspense fallback */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/listing" element={<BusListing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/booking" element={<SeatLayout />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-summary" element={<OrderSummary />} />
          </Routes>
        </Suspense>
      </div>
      </ErrorBoundary>  
    </main>
  );
}

export default App;
