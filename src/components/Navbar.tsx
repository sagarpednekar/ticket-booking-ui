import { NavLink } from "react-router-dom";

export default function Navbar() {
    return(
        <nav className="bg-white shadow mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <NavLink to="/">
                <img src="https://www.shutterstock.com/shutterstock/photos/518240410/display_1500/stock-vector-ticket-logo-vector-518240410.jpg" alt="Logo" className="h-8 w-auto" />
                </NavLink>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <NavLink to="/listing" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Booking 
                </NavLink>
                <NavLink to="/dashboard" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Dashboard
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
    
}