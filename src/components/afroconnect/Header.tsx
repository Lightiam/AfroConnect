
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-[#355E3B] text-white shadow-md">
      <div className="container mx-auto px-3 md:px-4 py-2 md:py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/e6dee00a-5d92-435b-a385-666bdf0a083b.png" 
              alt="AfroConnect Logo" 
              className="h-8 md:h-10 w-auto bg-white rounded-md p-1"
            />
            <h1 className="text-xl md:text-2xl font-bold">AfroConnect</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link to="/buyer-profile" className="px-3 py-2 rounded-full text-sm bg-white/20 hover:bg-white/30 transition-all">
              Sign In
            </Link>
            <Link to="/vendor-profile" className="px-3 py-2 rounded-full text-sm bg-white hover:bg-opacity-90 text-[#355E3B] transition-all">
              Become a Vendor
            </Link>
          </nav>
          <button className="md:hidden text-xl">
            <i className="ti ti-menu-2" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
